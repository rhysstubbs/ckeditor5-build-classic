class CustomFigureAttributes {
	constructor( editor ) {
		this.editor = editor;
	}

	afterInit() {
		const editor = this.editor;

		// Define on which elements the CSS classes should be preserved:
		setupCustomClassConversion( 'img', 'image', editor );

		editor.conversion.for( 'upcast' ).add( upcastCustomClasses( 'figure' ), { priority: 'low' } );

		// Define custom attributes that should be preserved.
		// setupCustomAttributeConversion( 'img', 'image', 'id', editor );
	}
}

function setupCustomClassConversion( viewElementName, modelElementName, editor ) {
	// The 'customClass' attribute will store custom classes from the data in the model so schema definitions allow this attribute.
	editor.model.schema.extend( modelElementName, { allowAttributes: [ 'customClass' ] } );

	// Define upcast converters for the <img> and <table> elements with a "low" priority so they are run after the default converters.
	editor.conversion.for( 'upcast' ).add( upcastCustomClasses( viewElementName ), { priority: 'low' } );

	// Define downcast converters for a model element with a "low" priority so they are run after the default converters.
	editor.conversion.for( 'downcast' ).add( downcastCustomClasses( modelElementName ), { priority: 'low' } );
}

function upcastCustomClasses( elementName ) {
	return dispatcher => dispatcher.on( `element:${ elementName }`, ( evt, data, conversionApi ) => {
		const viewItem = data.viewItem;
		const modelRange = data.modelRange;

		const modelElement = modelRange && modelRange.start.nodeAfter;

		if ( !modelElement ) {
			return;
		}

		// The upcast conversion picks up classes from the base element and from the <figure> element so it should be extensible.
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

		// The code below assumes that classes are set on the <figure> element...
		// conversionApi.writer.addClass( modelElement.getAttribute( 'customClass' ), viewFigure );

		// ... but if you prefer the classes to be passed to the <img> element, find the view element inside the <figure>:
		//
		const viewElement = findViewChild( viewFigure, 'img', conversionApi );
		conversionApi.writer.addClass( modelElement.getAttribute( 'customClass' ), viewElement );
	} );
}

function findViewChild( viewElement, viewElementName, conversionApi ) {
	const viewChildren = Array.from( conversionApi.writer.createRangeIn( viewElement ).getItems() );

	return viewChildren.find( item => item.is( viewElementName ) );
}

// function upcastAttribute( viewElementName, viewAttribute, modelAttribute ) {
// 	return dispatcher => dispatcher.on( `element:${ viewElementName }`, ( evt, data, conversionApi ) => {
// 		const viewItem = data.viewItem;
// 		const modelRange = data.modelRange;

// 		const modelElement = modelRange && modelRange.start.nodeAfter;

// 		if ( !modelElement ) {
// 			return;
// 		}

// 		conversionApi.writer.setAttribute( modelAttribute, viewItem.getAttribute( viewAttribute ), modelElement );
// 	} );
// }

// function downcastAttribute( modelElementName, viewElementName, viewAttribute, modelAttribute ) {
// 	return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
// 		const modelElement = data.item;

// 		const viewFigure = conversionApi.mapper.toViewElement( modelElement );
// 		const viewElement = findViewChild( viewFigure, viewElementName, conversionApi );

// 		if ( !viewElement ) {
// 			return;
// 		}

// 		conversionApi.writer.setAttribute( viewAttribute, modelElement.getAttribute( modelAttribute ), viewElement );
// 	} );
// }

export default CustomFigureAttributes;
