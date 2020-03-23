import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageModalCommand from './image-modal-command';

import { viewToModelStyleAttribute, modelToViewStyleAttribute } from './converters';

export default class ImageModalEditing extends Plugin {
	static get pluginName() {
		return 'ImageModalEditing';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const data = editor.data;
		const editing = editor.editing;

		schema.extend( 'image', { allowAttributes: 'class' } );

		// Converters for imageStyle attribute from model to view.
		editing.downcastDispatcher.on( 'attribute:class:image', modelToViewStyleAttribute() );
		data.downcastDispatcher.on( 'attribute:class:image', modelToViewStyleAttribute() );

		// Converter for figure element from view to model.
		data.upcastDispatcher.on( 'element:figure', viewToModelStyleAttribute(), { priority: 'low' } );

		editor.commands.add( 'imageModalCmd', new ImageModalCommand( editor ) );
	}
}
