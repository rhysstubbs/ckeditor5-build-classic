
import Command from '@ckeditor/ckeditor5-core/src/command';
import { isImage } from './utils';

export default class ImageModalCommand extends Command {
	constructor( editor ) {
		super( editor );
		console.log(this);
	}

	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

		this.isEnabled = isImage( element );

		if ( !element ) {
			this.value = null;
		} else if ( element.classList.includes( 'img-modal' ) ) {
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
				writer.removeAttribute( 'class', imageElement );
			} else {
				writer.setAttribute( 'class', 'img-modal', imageElement );
			}
		} );
	}
}
