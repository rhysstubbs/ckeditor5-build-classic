
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageModalEditing from './image-modal-editing';
import ImageModalUI from './image-modal-ui';

export default class ImageModal extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ImageModalEditing, ImageModalUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ImageModal';
	}
}
