/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Pane, Button } from "evergreen-ui";
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import ListTool from "@editorjs/list";
import Checklist from "./Checklist";
import firebase from "../../firebase";
import { useSelectedLanguage } from "../../context/language";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

export const Editor = ({ db, content, selectedContext, documentRef }) => {
  const { selectedLanguage } = useSelectedLanguage();
  const [editor, setEditor] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null);

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

  const save = () => {
    //const documentRef = firebase.firestore().collection("weeklyInformation").doc(selectedLang).collection("content").doc(content.id);
    editor
      .save()
      .then(outputData => {
        const update = outputData;
        const contextUpdate = {
          [selectedContext]: outputData
        };
        console.log("fff", outputData);
        setData(outputData);
        documentRef
          .update(selectedContext ? contextUpdate : update)
          .then(function() {
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      })
      .catch(error => {
        console.log("Saving failed: ", error);
      });
  };

  const getContent = content => {
    if (!selectedContext) {
      return content;
    }

    if (!content[selectedContext]) return {};

    return content[selectedContext];
  };

  useEffect(() => {
    const newEditor = new EditorJS({
      data: getContent(content),
      holder: `editor-${content.id}`,
      tools: {
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
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        list: {
          class: ListTool,
          inlineToolbar: true
        }
      }
    });
    setEditor(newEditor);

    return () => {
      if (editor && editor.destroy) {
        editor.destroy();
      }
    };
  }, [content, selectedContext, selectedLanguage]);

  return (
    <Pane width={600}>
      <Pane padding={20}>
        <Pane
          border
          height={400}
          overflowY="auto"
          id={`editor-${content.id}`}
        ></Pane>
      </Pane>
      <BottomButtonWrapper>
        <Button intent="success" appearance="primary" onClick={save}>
          Spara
        </Button>
      </BottomButtonWrapper>
    </Pane>
  );
};
