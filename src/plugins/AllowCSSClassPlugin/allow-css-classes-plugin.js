class AllowCSSClassesPlugin {
	constructor( editor ) {
		this.editor = editor;
	}

	init() {
		const editor = this.editor;

		editor.model.schema.extend( 'paragraph', {
			allowAttributes: 'class'
		} );

		editor.model.schema.extend( 'heading2', {
			allowAttributes: 'class'
		} );

		editor.model.schema.extend( 'heading3', {
			allowAttributes: 'class'
		} );

		editor.model.schema.extend( 'heading4', {
			allowAttributes: 'class'
		} );
	}
}

export default AllowCSSClassesPlugin;
