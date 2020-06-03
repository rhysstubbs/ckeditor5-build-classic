import Command from '@ckeditor/ckeditor5-core/src/command';

class ElementAddAttributesCommand extends Command {
	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

		this.isEnabled = true;

		if ( !!element && element.hasAttribute( 'id' ) ) {
			this.value = element.getAttribute( 'id' );
		} else {
			this.value = false;
		}
	}

	execute( options ) {
		const model = this.editor.model;
		const imageElement = model.document.selection.getSelectedElement();

		model.change( writer => {
			writer.setAttribute( 'id', options.newValue, imageElement );
		} );
	}
}

export default ElementAddAttributesCommand;
