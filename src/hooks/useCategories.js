import { useState, useEffect } from "react";

import categoriesService from "../services/categoriesService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  //const [deletedBloggersList, setDeletedBloggersList] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    return categoriesService.subscribeToCategories((err, items) => {
      if (err) {
        console.log(err);
      } else {
        setCategories(items.filter(item => !item.deleted));
        // setDeletedBloggersList(items.filter(item => item.deleted));
      }
    });
  }, [setCategories]); //todo, check if necessary



//   const permanentlyDeleteBloggers = async bloggersId => {
//     try {
//       await BloggersService.deleteBloggers(bloggersId);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const restoreBloggers = async bloggersId => {
//     try {
//       await BloggersService.flagDeleted(bloggersId, false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return {
    blogCategories
    // deletedBloggersList,
    // restoreBloggers,
    // permanentlyDeleteBloggers
  };
};