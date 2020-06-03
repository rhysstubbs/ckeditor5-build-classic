class AllowIDPlugin {
	constructor( editor ) {
		this.editor = editor;
	}

	init() {
		const editor = this.editor;

		editor.model.schema.extend( 'paragraph', {
			allowAttributes: 'id'
		} );

		editor.model.schema.extend( 'heading2', {
			allowAttributes: 'id'
		} );

		editor.model.schema.extend( 'heading3', {
			allowAttributes: 'id'
		} );

		editor.model.schema.extend( 'heading4', {
			allowAttributes: 'id'
		} );
	}
}

export default AllowIDPlugin;
