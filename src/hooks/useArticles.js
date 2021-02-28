import { useState, useEffect } from "react";

import ArticlesService from "../services/ArticlesService";

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [deletedArticles, setDeletedArticles] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    return ArticlesService.subscribeToArticles((err, items) => {
      if (err) {
        console.log(err);
      } else {
        setArticles(items.filter(item => !item.deleted));
        setDeletedArticles(items.filter(item => item.deleted));
      }
    });
  }, []);

  const permanentlyDeleteArticle = async articleId => {
    try {
      await ArticlesService.deleteArticle(articleId);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreArticle = async articleId => {
    try {
      await ArticlesService.flagDeleted(articleId, false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    articles,
    setArticles,
    deletedArticles,
    setDeletedArticles,
    permanentlyDeleteArticle,
    restoreArticle
  };
};
