/* eslint-disable no-undef */
/* eslint-disable no-alert */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

class NormalisePastedHTMLContent extends Plugin {
	static get pluginName() {
		return 'NormalisePastedHTMLContent';
	}

	init() {
		const editor = this.editor;

		// Logic responsible for converting HTML to plain text.
		const clipboardPlugin = editor.plugins.get( 'Clipboard' );
		const editingView = editor.editing.view;

		const allowedUrls = editor.config.get( 'assets.allowedUrls' ) || [];

		editingView.document.on( 'clipboardInput', ( evt, data ) => {
			if ( editor.isReadOnly ) {
				return;
			}

			const dataTransfer = data.dataTransfer;
			let content = dataTransfer.getData( 'text/html' );

			// eslint-disable-next-line no-undef
			const contentCopy = document.createElement( 'div' );
			contentCopy.innerHTML = content;

			const images = Array.from( contentCopy.getElementsByTagName( 'img' ) );
			const imagesToRemove = new Set();

			for ( let i = 0; i < images.length; i++ ) {
				// eslint-disable-next-line no-undef
				const url = new URL( images[ i ].src );
				if ( !allowedUrls.includes( url.hostname ) ) {
					imagesToRemove.add( images[ i ].src );
				}
			}

			images.forEach( ( img, i ) => {
				if ( imagesToRemove.has( img.src ) ) {
					images[ i ].parentNode.removeChild( images[ i ] );
				}
			} );

			content = clipboardPlugin._htmlDataProcessor.toView( contentCopy.innerHTML );
			clipboardPlugin.fire( 'inputTransformation', { content, dataTransfer } );
			editingView.scrollToTheSelection();
			evt.stop();
			if ( imagesToRemove.size > 0 ) {
				setTimeout( () => {
					alert( 'Please insert images using the toolbar instead of copying & pasting.' );
				}, 50 );
			}
		} );
	}
}

export default NormalisePastedHTMLContent;
