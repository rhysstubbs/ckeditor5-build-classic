
import Command from '@ckeditor/ckeditor5-core/src/command';
import { isImage } from './utils';

export default class ImageModalCommand extends Command {
	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

		this.isEnabled = isImage( element );

		if ( !element ) {
			this.value = false;
		} else if ( element._attrs.has( 'customClass' ) && element._attrs.get( 'customClass' ).includes( 'img-popup' ) ) {
			this.value = true;
		} else {
			this.value = false;
		}
	}
	execute() {
		const model = this.editor.model;
		const imageElement = model.document.selection.getSelectedElement();

		model.change( writer => {
			if ( this.value ) {
				writer.removeAttribute( 'customClass', imageElement );
			} else {
				writer.setAttribute( 'customClass', 'img-popup', imageElement );
			}
		} );
	}
}
