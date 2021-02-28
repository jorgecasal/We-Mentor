import { useState, useEffect } from "react";

import BloggersService from "../services/BloggersService";

export const useBloggersList = () => {
  const [bloggersList, setBloggersList] = useState([]);
  const [deletedBloggersList, setDeletedBloggersList] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    return BloggersService.subscribeToBloggersList((err, items) => {
      if (err) {
        console.log(err);
      } else {
        setBloggersList(items.filter(item => !item.deleted));
        setDeletedBloggersList(items.filter(item => item.deleted));
      }
    });
  }, [setBloggersList]);

  const permanentlyDeleteBlogger = async bloggersId => {
    try {
      await BloggersService.deleteBlogger(bloggersId);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreBlogger = async bloggersId => {
    try {
      await BloggersService.flagDeleted(bloggersId, false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    bloggersList,
    deletedBloggersList,
    restoreBlogger,
    permanentlyDeleteBlogger,
  };
};
