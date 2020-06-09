class CustomHeadingAttributes {
	constructor( editor ) {
		this.editor = editor;
	}

	afterInit() {
		const editor = this.editor;

		for ( let i = 2; i <= 5; i++ ) {
			const viewName = `h${ i }`;
			const modelName = `heading${ i }`;

			editor.model.schema.extend( modelName, { allowAttributes: [ 'customClass' ] } );
			editor.model.schema.extend( modelName, { allowAttributes: [ 'customId' ] } );

			editor.conversion.for( 'upcast' ).add( upcastCustomClasses( viewName ), { priority: 'low' } );
			editor.conversion.for( 'downcast' ).add( downcastCustomClasses( modelName ), { priority: 'low' } );

			editor.conversion.for( 'upcast' ).add( upcastCustomIds( viewName ), { priority: 'low' } );
			editor.conversion.for( 'downcast' ).add( downcastCustomIds( modelName ), { priority: 'low' } );

			editor.conversion.for( 'upcast' ).add( upcastCustomClasses( viewName ), { priority: 'low' } );
		}
	}
}

function upcastCustomClasses( elementName ) {
	return dispatcher => dispatcher.on( `element:${ elementName }`, ( evt, data, conversionApi ) => {
		const viewItem = data.viewItem;
		const modelRange = data.modelRange;
		const modelElement = modelRange && modelRange.start.nodeAfter;

		if ( !modelElement ) {
			return;
		}

		const currentAttributeValue = modelElement.getAttribute( 'customClass' ) || [];

		currentAttributeValue.push( ...viewItem.getClassNames() );

		conversionApi.writer.setAttribute( 'customClass', currentAttributeValue, modelElement );
	} );
}

function downcastCustomClasses( modelElementName ) {
	return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
		const modelElement = data.item;

		const viewFigure = conversionApi.mapper.toViewElement( modelElement );

		if ( !viewFigure ) {
			return;
		}

		conversionApi.writer.addClass( modelElement.getAttribute( 'customClass' ), viewFigure );
	} );
}

function upcastCustomIds( elementName ) {
	return dispatcher => dispatcher.on( `element:${ elementName }`, ( evt, data, conversionApi ) => {
		const viewItem = data.viewItem;
		const modelRange = data.modelRange;
		const modelElement = modelRange && modelRange.start.nodeAfter;

		if ( !modelElement ) {
			return;
		}

		const currentAttributeValue = viewItem.getAttribute( 'id' );

		if ( typeof currentAttributeValue === 'undefined' ) {
			return;
		}

		conversionApi.writer.setAttribute( 'customId', currentAttributeValue, modelElement );
	} );
}

function downcastCustomIds( modelElementName ) {
	return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
		const modelElement = data.item;
		const viewFigure = conversionApi.mapper.toViewElement( modelElement );

		if ( !viewFigure ) {
			return;
		}

		const value = modelElement.getAttribute( 'customId' );

		if ( typeof value === 'undefined' ) {
			return;
		}

		conversionApi.writer.setAttribute( 'id', value, viewFigure );
	} );
}

export default CustomHeadingAttributes;
