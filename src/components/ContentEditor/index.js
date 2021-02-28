/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Pane, toaster } from "evergreen-ui";
import EditorJs from "react-editor-js";
import ImageTool from "@editorjs/image";
import ListTool from "@editorjs/list";

import ContentService from "../../services/ContentService";

import firebase from "../../firebase";
import { useSelectedLanguage } from "../../context/language";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

export const ContentEditor = ({
  content,
  documentRef,
  setEditorContent,
  contentName
}) => {
  const { selectedLanguage } = useSelectedLanguage();
  const [editor, setEditor] = useState(null);

  const handleFireBaseUpload = imageAsFile => {
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    return firebase
      .storage()
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
  };

  const save = async () => {
    try {
      const outputData = await editor.save();

      await ContentService.saveEditorContent(documentRef, selectedLanguage, {
        ...outputData,
        name: contentName
      });

      toaster.success(`${contentName} uppdaterades.`);

      setEditorContent(outputData);
    } catch (error) {
      console.log("Saving failed: ", error);
    }
  };

  return (
    <Pane>
      <EditorJs
        holder="editor-js"
        enableReInitialize
        instanceRef={instance => setEditor(instance)}
        data={content}
        tools={{
          image: {
            class: ImageTool,
            config: {
              uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file) {
                  return handleFireBaseUpload(file).then(data => {
                    return firebase
                      .storage()
                      .ref("images")
                      .child(data.ref.name)
                      .getDownloadURL()
                      .then(url => {
                        return {
                          success: 1,
                          file: {
                            url: url
                          }
                        };
                      });
                  });
                }
              }
            }
          },
          list: {
            class: ListTool,
            inlineToolbar: true
          }
        }}
      >
        <Pane border height={400} overflowY="auto" id="editor-js"></Pane>
      </EditorJs>
      <BottomButtonWrapper>
        <Button intent="success" appearance="primary" onClick={save}>
          Spara
        </Button>
      </BottomButtonWrapper>
    </Pane>
  );
};
