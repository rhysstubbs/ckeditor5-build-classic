/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
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
import AddTargetToExternalLinks from './plugins/AddTargetToLinkPlugin/add-target-to-link';
import ImageModal from './plugins/ImageModalPlugin/image-modal';

import CustomFigureAttributes from './plugins/CustomFigureAttributes/custom-figure-attributes-plugin';

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	CKFinder,
	EasyImage,
	Heading,
	CustomFigureAttributes,
	Image,
	ImageModal,
	ImageCaption,
	ImageToolbar,
	ImageUpload,
	ImageResize,
	ImageStyle,
	Link,
	List,
	Paragraph,
	PasteFromOffice,
	Title,
	Underline,
	TextTransformation,
	AddTargetToExternalLinks,
	ConvertDivAttributes,
	AllowLinkTarget,
	CustomCKFinderUploadAdapter
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
			'undo',
			'redo'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative',
			'imageModal'
		],
		resizeUnit: 'px',
		upload: {
			types: [ 'png', 'jpeg', 'jpg', 'gif' ]
		},
		imageResize: {
			enable: true
		}
	}
};

export default ClassicEditor;
