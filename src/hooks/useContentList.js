import { useState, useEffect } from "react";

import ContentService from "../services/ContentService";

export const useContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [deletedContentList, setDeletedContentList] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    return ContentService.subscribeToContentList((err, items) => {
      if (err) {
        console.log(err);
      } else {
        setContentList(items.filter(item => !item.deleted));
        setDeletedContentList(items.filter(item => item.deleted));
      }
    });
  }, [setContentList]);

  const permanentlyDeleteContent = async contentId => {
    try {
      await ContentService.deleteContent(contentId);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreContent = async contentId => {
    try {
      await ContentService.flagDeleted(contentId, false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    contentList,
    deletedContentList,
    restoreContent,
    permanentlyDeleteContent
  };
};
