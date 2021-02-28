import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toaster } from "evergreen-ui";

import { useSelectedLanguage } from "../context/language";
import ContentService from "../services/ContentService";

export const useContentDetails = contentId => {
  const history = useHistory();
  const { selectedLanguage } = useSelectedLanguage();

  const [editorContent, setEditorContent] = useState(null);
  const [documentRef, setDocumentRef] = useState(null);
  const [contentName, setContentName] = useState("");

  useEffect(() => {
    const onLanguageChange = async language => {
      try {
        setEditorContent(null);
        const docRef = await ContentService.getContentRef(contentId);

        setDocumentRef(docRef);

        const content = await ContentService.getEditorContent(
          docRef,
          selectedLanguage
        );
        const data = content.data();
        if (data) {
          setContentName(data.name);
          setEditorContent({ blocks: data.blocks });
        } else {
          setContentName("");
          setEditorContent({ blocks: [] });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedLanguage) {
      onLanguageChange(selectedLanguage);
    }
  }, [selectedLanguage, contentId]);

  const deleteContent = async () => {
    try {
      history.push("/content");
      await ContentService.flagDeleted(contentId);
      toaster.notify(`${contentName} flyttades till papperskorgen`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    documentRef,
    editorContent,
    setEditorContent,
    contentName,
    setContentName,
    deleteContent
  };
};
