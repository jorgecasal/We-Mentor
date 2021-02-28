import { useState, useEffect } from "react";

import BlogpostsService from "../services/BlogPostsService";

export const useBlogposts = (id) => {
  const [blogposts, setBlogposts] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    return BlogpostsService.subscribeToBlogposts((err, items) => {
      if (err) {
        console.log(err);
      } else {
        setBlogposts(items);
      }
    });
  }, [setBlogposts]);

  const permanentlyDeleteBlogger = async bloggersId => {
    try {
      await BlogpostsService.deletePost(bloggersId);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    blogposts,
    permanentlyDeleteBlogger,
  };
};
