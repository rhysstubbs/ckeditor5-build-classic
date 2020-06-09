import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Title from '@ckeditor/ckeditor5-heading/src/title';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';

import CustomCKFinderUploadAdapter from './plugins/CustomUploadAdapter/upload-adapter';
import ConvertDivAttributes from './plugins/AllowDivPlugin/allow-div-plugin';
import AllowLinkTarget from './plugins/AllowLinkTargetPlugin/allow-link-target';
import ImageModal from './plugins/ImageModalPlugin/image-modal';
import CustomFigureAttributes from './plugins/CustomFigureAttributes/custom-figure-attributes-plugin';
import AllowCSSClassesPlugin from './plugins/AllowCSSClassPlugin/allow-css-classes-plugin';
import AllowIDPlugin from './plugins/AllowIdPlugin/allow-element-ids-plugin';
import ElementAddAttributes from './plugins/AddAttributeToElementPlugin/add-attribute-to-element';
import CustomHeadingAttributes from './plugins/CustomHeadingAttributes/custom-heading-attributes-plugin';

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	CKFinder,
	EasyImage,
	Heading,
	CustomHeadingAttributes,
	CustomFigureAttributes,
	Image,
	ImageModal,
	ImageCaption,
	ImageToolbar,
	ImageUpload,
	ImageResize,
	ImageStyle,
	PasteFromOffice,
	Title,
	Link,
	List,
	Paragraph,
	AllowCSSClassesPlugin,
	AllowIDPlugin,
	Underline,
	TextTransformation,
	ConvertDivAttributes,
	AllowLinkTarget,
	CustomCKFinderUploadAdapter,
	ElementAddAttributes
];

ClassicEditor.defaultConfig = {
	title: {
		placeholder: 'Headline ...'
	},
	placeholder: 'Body ...',
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'link',
			'imageUpload',
			'|',
			'elementAddAttributes',
			'|',
			'undo',
			'redo'
		]
	},
	heading2: {
		toolbar: [
			'elementAddAttributes'
		]
	},
	image: {
		toolbar: [
			'imageTextAlternative',
			'imageModal',
			'|',
			'imageStyle:full',
			'|',
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight'
		],
		resizeUnit: 'px',
		styles: [
			'full',
			'alignLeft',
			'alignCenter',
			'alignRight'
		],
		upload: {
			types: [ 'png', 'jpeg', 'jpg', 'gif' ]
		},
		imageResize: {
			enable: true
		}
	},
	link: {
		addTargetToExternalLinks: false,
		decorators: {
			downloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'download'
				}
			},
			target: {
				mode: 'automatic',
				callback: url => !url.startsWith( '#' ) && url[ 0 ] !== '#',
				attributes: {
					target: '_blank'
				}
			},
			external: {
				mode: 'automatic',
				callback: url => !url.includes( 'thinkspain.com' ) && url[ 0 ] !== '#',
				attributes: {
					rel: 'noopener noreferrer'
				}
			},
			local: {
				mode: 'automatic',
				callback: url => url.startsWith( '#' ),
				attributes: {
					class: 'local-link'
				}
			}
		}
	},
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5'
			}
		]
	},
	allowedContent: true,
	ckfinder: {
		options: {
			resourceType: 'Images'
		},
		validation: {
			minWidth: 800
		}
	}
};

export default ClassicEditor;
