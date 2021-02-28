import { useState, useEffect } from "react";

import ArticleCategoriesService from "../services/ArticleCategoriesService";

export const useArticleCategoriesList = () => {
  const [articleCatetgoriesList, setArticleCategoriesList] = useState([]);
  const [deletedCategories, setDeletedCategories] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    return ArticleCategoriesService.subscribeToArticleCategoriesList((err, items) => {
      if (err) {
        console.log(err);
      } else {
        setArticleCategoriesList(items.filter(item => !item.deleted));
        setDeletedCategories(items.filter(item => item.deleted));

      }
    });
  }, []);



  const permanentlyDeleteCategory = async categoryId => {
    try {
      await ArticleCategoriesService.deleteCategory(categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreCategory = async categoryId => {
    try {
      await ArticleCategoriesService.flagDeleted(categoryId, false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    articleCatetgoriesList,
    permanentlyDeleteCategory,
    restoreCategory,
    deletedCategories,
    setArticleCategoriesList
  };
};
