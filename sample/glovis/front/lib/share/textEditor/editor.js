import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import Dropzone from 'react-dropzone';
import QuillBetterTable from 'quill-better-table';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';
import '@lib/share/textEditor/editor-custom.css';

import { imgUrl } from '@src/utils/HttpUtils';

Quill.register(
  {
    'modules/better-table': QuillBetterTable
  },
  true
);

const Editor = ({ editing = true, onChange, value, url }) => {
  const rootRef = useRef();
  const dropzoneRef = useRef();
  const [quill, setQuill] = useState(null);

  const handleImage = () => {
    // console.log('dropzoneRef : ', dropzoneRef)
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const saveFile = async (file) => {
    // console.log("saveFile -> file", file)
    //이미지 업로드 api 태우기
    const formData = new FormData();
    formData.append('files', file[0]);

    //임시
    return new Promise((resolve) => {
      resolve(file);
    }).then((file) => {
      return {
        url: '/images/dummy/product-img-06.png'
      };
    });
  };

  const onDrop = async (acceptedFiles = []) => {
    // console.log('init quill : ', quill)
    // console.log("Editor -> onDrop -> acceptedFiles", acceptedFiles)
    try {
      await acceptedFiles.reduce((pacc, _file, i) => {
        return pacc.then(async () => {
          // console.log('saveFile : ', saveFile)
          const { url } = await saveFile(_file);
          // console.log("Editor -> onDrop -> url", url)
          const range = quill?.getSelection();
          quill?.insertEmbed(range.index, 'image', url);
          quill?.setSelection(range.index + 1);
          quill?.focus();
        });
      }, Promise.resolve());
    } catch (error) {}
  };

  const modules = {
    toolbar: {
      container: [[{ header: '1' }, { header: '2' }, { font: [] }], [{ size: [] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], ['link', 'image', 'video'], ['clean']],
      handlers: { image: handleImage }
    },
    table: false, // disable table module
    'better-table': {
      operationMenu: {
        items: {
          unmergeCells: {
            text: 'Another unmerge cells name'
          }
        }
      }
    },
    keyboard: {
      bindings: QuillBetterTable.keyboardBindings
    }
  };

  useEffect(() => {
    const newQuill = new Quill(rootRef.current, {
      theme: 'snow', //editing ? 'snow' : 'bubble',
      modules: editing
        ? modules
        : {
            toolbar: false
          }
    });

    if (!quill) {
      // console.log('init quill : ', quill)
      // console.log("Editor -> newQuill", newQuill)
      setQuill(newQuill);
    }
  }, []);

  useEffect(() => {
    if (quill && quill?.on && quill?.root) {
      console.log('once : ', quill);
      quill?.on('editor-change', (eventName, ...args) => {
        if (eventName === 'text-change') {
          // args[0] will be delta
          // console.log('text-change args : ', args)
          onChange({
            value: quill?.root.innerHTML
          });
        }
      });
      quill.root.innerHTML = value;
      if (!editing) {
        quill?.disable();
      }
    }
  }, [quill]);

  useEffect(() => {
    if (quill?.root) {
      quill.root.innerHTML = value;
    }
  }, [value]);

  return (
    <>
      <div>
        <div ref={rootRef}></div>
      </div>
      <Dropzone ref={dropzoneRef} onDrop={(files) => onDrop(files)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default Editor;
