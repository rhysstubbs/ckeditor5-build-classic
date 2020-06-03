import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ElementAddAttributesCommand from './add-attribute-to-element-command';

class ElementAddAttributesEditing extends Plugin {
	static get pluginName() {
		return 'ElementAddAttributesEditing';
	}

	init() {
		this.editor.commands.add( 'elementAddAttributes', new ElementAddAttributesCommand( this.editor ) );
	}
}

export default ElementAddAttributesEditing;
