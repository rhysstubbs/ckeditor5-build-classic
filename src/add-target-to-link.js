export default function AddTargetToExternalLinks( editor ) {
	// Both the data and the editing pipelines are affected by this conversion.
	editor.conversion.for( 'downcast' ).add( dispatcher => {
		// Links are represented in the model as a "linkHref" attribute.
		// Use the "low" listener priority to apply the changes after the link feature.
		dispatcher.on( 'attribute:linkHref', ( evt, data, conversionApi ) => {
			const viewWriter = conversionApi.writer;
			const viewSelection = viewWriter.document.selection;

			// Adding a new CSS class is done by wrapping all link ranges and selection
			// in a new attribute element with the "target" attribute.
			const viewElement = viewWriter.createAttributeElement( 'a', {
				target: '_blank'
			}, {
				priority: 5
			} );

			if ( data.attributeNewValue.match( /ckeditor\.com/ ) ) {
				viewWriter.unwrap( conversionApi.mapper.toViewRange( data.range ), viewElement );
			} else {
				if ( data.item.is( 'selection' ) ) {
					viewWriter.wrap( viewSelection.getFirstRange(), viewElement );
				} else {
					viewWriter.wrap( conversionApi.mapper.toViewRange( data.range ), viewElement );
				}
			}
		}, { priority: 'low' } );
	} );
}
