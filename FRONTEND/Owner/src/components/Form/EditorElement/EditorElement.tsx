/* eslint-disable no-sparse-arrays */
import { Controller } from 'react-hook-form';
import ReactQuill, { Quill } from 'react-quill';
import { FormControl, FormLabel } from '@mui/material';
import ImageResize from 'quill-image-resize-module-react';
import QuillBetterTable from 'quill-better-table';
import { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';
import './EditorStyles.css';
Quill.register('modules/imageResize', ImageResize);

// font family
const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = [
  'General-Sans',
  'Arial',
  'Times-New-Roman',
  'Ubuntu-Condensed',
  'Lora',
  'Lato',
  'Ubuntu',
  'Ubuntu-Mono',
  'Helvetica',
  'Archivo-Black',
  'Archivo-Narrow',
  'Gidole',
  'Kollektif',
  'League-Spartan',
  'Libre-Baskerville',
  'Merriweather',
  'Courier-New',
  'Lucida-Console',
  'Verdana',
  'Georgia',
  'Tahoma',
  'Palatino',
  'Garamond',
  'Roboto',
  'Raleway',
  'Montserrat',
  'Rubik',
];
ReactQuill.Quill.register(Font, true);

// font size
var fontSizeStyle = Quill.import('attributors/style/size');
fontSizeStyle.whitelist = [
  '10px',
  '11px',
  '12px',
  '13px',
  '14px',
  '15px',
  '16px',
  '17px',
  '18px',
  '19px',
  '20px',
  '24px',
  '26px',
  '28px',
  '36px',
  '48px',
  '72px',
];
Quill.register(fontSizeStyle, true);

// line height / line spacing
var Parchment = Quill.import('parchment');
var lineHeightConfig = {
  scope: Parchment.Scope.INLINE,
  whitelist: ['1.0', '1.2', '1.5', '1.6', '1.8', '2.0', '2.4', '2.8', '3.0', '4.0', '5.0'],
};
var lineHeightClass = new Parchment.Attributor.Class(
  'lineheight',
  'ql-line-height',
  lineHeightConfig,
);
var lineHeightStyle = new Parchment.Attributor.Style('lineheight', 'line-height', lineHeightConfig);
Parchment.register(lineHeightClass);
Parchment.register(lineHeightStyle);

export default function EditorElement(props: any) {
  const { name, control, label, placeholder } = props;
  const reactQuillRef = useRef(null);
  const modules = {
    toolbar: [
      [{ font: Font.whitelist }] /* front family */,
      [{ size: fontSizeStyle.whitelist }, false],
      [{ header: 1 }, { header: 2 }] /* size header */,
      [{ header: [1, 2, 3, 4, 5, 6, false] }] /* size header */,
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ] /* align content */,
      ,
      ['bold', 'italic', 'underline', 'strike', 'blockquote'] /* format font weight */,
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ] /* order list */,
      [{ script: 'sub' }, { script: 'super' }],
      [{ direction: 'rtl' }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['clean'],
      ['formula'],
      // [{ table: 'better-table' }],
      [
        {
          lineheight: ['1.0', '1.2', '1.5', '1.6', '1.8', '2.0', '2.4', '2.8', '3.0', '4.0', '5.0'],
        },
      ],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
      displaySize: true,
    },
  };

  const formats = [
    'header',
    'font',
    'list',
    'bold',
    'underline',
    'strike',
    'color',
    'background',
    'italic',
    'align',
    'script',
    'blockquote',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'font-family',
    'size',
    'formula',
    // 'table',
    'lineheight',
  ];

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        return (
          <FormControl fullWidth>
            {label && <FormLabel sx={{ marginLeft: 1, marginBottom: '6px' }}>{label}</FormLabel>}
            <ReactQuill
              ref={reactQuillRef}
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
            />
          </FormControl>
        );
      }}
    />
  );
}
