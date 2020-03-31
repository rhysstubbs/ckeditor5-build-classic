/* eslint-disable no-alert */
/* eslint-disable no-undef */
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals XMLHttpRequest, FormData */

/**
 * @module adapter-ckfinder/uploadadapter
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import { getCsrfToken } from '../../utils';

/**
 * A plugin that enables file uploads in CKEditor 5 using the CKFinder server–side connector.
 *
 * See the {@glink features/image-upload/ckfinder "CKFinder file manager integration" guide} to learn how to configure
 * and use this feature as well as find out more about the full integration with the file manager
 * provided by the {@link module:ckfinder/ckfinder~CKFinder} plugin.
 *
 * Check out the {@glink features/image-upload/image-upload comprehensive "Image upload overview"} to learn about
 * other ways to upload images into CKEditor 5.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CustomCKFinderUploadAdapter extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ FileRepository ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'CustomCKFinderUploadAdapter';
	}

	static get rules() {
		return {
			minWidth: 800,
			minHeight: 0
		};
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const config = this.editor.config.get( 'ckfinder' );

		const url = config.uploadUrl || '';

		let rules = { ...CustomCKFinderUploadAdapter.rules };

		const userRules = this.editor.config.get( 'ckfinder.validation' );

		if ( typeof userRules !== 'undefined' && Object.keys( userRules ).length > 0 ) {
			rules = { ...rules, ...this.editor.config.get( 'ckfinder.validation' ) };
		}

		this.editor.plugins
			.get( FileRepository )
			.createUploadAdapter = loader => new CustomUploadAdapter( loader, url, rules, this.editor.t );
	}
}

/**
 * Upload adapter for CKFinder.
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
class CustomUploadAdapter {
	/**
	 * Creates a new adapter instance.
	 *
	 * @param {module:upload/filerepository~FileLoader} loader
	 * @param {String} url
	 * @param {module:utils/locale~Locale#t} t
	 */
	constructor( loader, url, rules, t ) {
		/**
		 * FileLoader instance to use during the upload.
		 *
		 * @member {module:upload/filerepository~FileLoader} #loader
		 */
		this.loader = loader;

		/**
		 * Upload URL.
		 *
		 * @member {String} #url
		 */
		this.url = url;

		/**
		 * File Validation Rules.
		 *
		 * @member {Object} #rules
		 */
		this.rules = rules;

		/**
		 * Locale translation method.
		 *
		 * @member {module:utils/locale~Locale#t} #t
		 */
		this.t = t;
	}

	/**
	 * Starts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#upload
	 * @returns {Promise.<Object>}
	 */
	upload() {
		return this.loader.file.then( file => {
			return new Promise( ( resolve, reject ) => {
				if ( this.rules.minWidth > 0 || this.rules.minHeight > 0 ) {
					// eslint-disable-next-line no-undef
					const fileReader = new FileReader();
					fileReader.readAsDataURL( file );
					fileReader.onload = () => {
						// eslint-disable-next-line no-undef
						const img = document.createElement( 'img' );
						img.src = fileReader.result;

						if ( img.width < this.rules.minWidth ) {
							const err = 'The image is smaller than the recommended size (800px wide). Do you still want to upload it?';
							const confirmed = confirm( err );						// eslint-disable-next-line no-undef
							// eslint-disable-next-line no-alert

							if ( !confirmed ) {
								reject();
							}
						}
					};
				}

				this._initRequest();
				this._initListeners( resolve, reject, file );
				this._sendRequest( file );
			} );
		} );
	}

	/**
	 * Aborts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#abort
	 */
	abort() {
		if ( this.xhr ) {
			this.xhr.abort();
		}
	}

	/**
	 * Initializes the XMLHttpRequest object.
	 *
	 * @private
	 */
	_initRequest() {
		const xhr = this.xhr = new XMLHttpRequest();
		xhr.open( 'POST', this.url(), true );
		xhr.responseType = 'json';
	}

	/**
	 * Initializes XMLHttpRequest listeners.
	 *
	 * @private
	 * @param {Function} resolve Callback function to be called when the request is successful.
	 * @param {Function} reject Callback function to be called when the request cannot be completed.
	 * @param {File} file File instance to be uploaded.
	 */
	_initListeners( resolve, reject, file ) {
		const xhr = this.xhr;
		const loader = this.loader;
		const t = this.t;
		const genericError = t( 'Cannot upload file:' ) + ` ${ file.name }.`;

		xhr.addEventListener( 'error', () => reject( genericError ) );
		xhr.addEventListener( 'abort', () => reject() );
		xhr.addEventListener( 'load', () => {
			const response = xhr.response;

			if ( !response || !response.uploaded ) {
				return reject( response && response.error && response.error.message ? response.error.message : genericError );
			}

			if ( response.hasOwnProperty( 'url' ) ) {
				resolve( {
					default: response.url
				} );
			} else if ( response.hasOwnProperty( 'urls' ) ) {
				resolve( response.urls );
			}
		} );

		// Upload progress when it's supported.
		/* istanbul ignore else */
		if ( xhr.upload ) {
			xhr.upload.addEventListener( 'progress', evt => {
				if ( evt.lengthComputable ) {
					loader.uploadTotal = evt.total;
					loader.uploaded = evt.loaded;
				}
			} );
		}
	}

	/**
	 * Prepares the data and sends the request.
	 *
	 * @private
	 * @param {File} file File instance to be uploaded.
	 */
	_sendRequest( file ) {
		// Prepare form data.
		const data = new FormData();
		data.append( 'upload', file );
		data.append( 'ckCsrfToken', getCsrfToken() );

		// Send request.
		this.xhr.send( data );
	}
}
