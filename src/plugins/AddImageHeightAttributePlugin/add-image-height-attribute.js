class AddImageDimentionAttributesPlugin {
	constructor( editor ) {
		this.editor = editor;
	}

	afterInit() {
		this.editor.model.schema.extend( 'image', {
			allowAttributes: [ 'height', 'width', 'data-aspect-ratio' ]
		} );
	}
}

export default AddImageDimentionAttributesPlugin;
