export default function ConvertDivAttributes( editor ) {
	// Allow <div> elements in the model.
	editor.model.schema.register( 'div', {
		allowIn: '$root'
	} );
}
