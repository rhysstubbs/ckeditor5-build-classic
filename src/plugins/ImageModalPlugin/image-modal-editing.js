/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/imagestyle/imagestyleediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageModalCommand from './image-modal-editing';

export default class ImageModalEditing extends Plugin {
	static get pluginName() {
		return 'ImageModalEditing';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		schema.extend( 'image', { allowAttributes: 'class' } );
		const cmd = new ImageModalCommand( editor );
		editor.commands.add( 'imageModalCmd', cmd );
	}
}
