import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';

export default class ImageModalUI extends Plugin {
	static get pluginName() {
		return 'ImageModalUI';
	}

	init() {
		this._createButton();
	}

	_createButton() {
		const editor = this.editor;

		const componentName = 'imageModal';

		editor.ui.componentFactory.add( componentName, locale => {
			const command = editor.commands.get( 'imageModalCmd' );
			const view = new ButtonView( locale );

			view.set( {
				label: 'Mark as Popup',
				tooltip: true,
				icon: checkIcon,
				isToggleable: true
			} );

			view.bind( 'isEnabled' ).to( command, 'isEnabled' );
			view.bind( 'isOn' ).to( command, 'value', value => value === true );

			this.listenTo( view, 'execute', () => {
				editor.execute( 'imageModalCmd' );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
