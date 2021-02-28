import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Menu, TextInputField, Button } from "evergreen-ui";
import { BlogPostsList } from "./BlogPostsList";
import { ContextMenu } from "../../components/ContextMenu";
import BloggersService from "../../services/BloggersService";
import { Categories } from "./Categories";
import { GeneralView } from "./GeneralView";
import { WeekView } from "./WeekView";
import { useBlogposts } from "../../hooks/useBlogposts";
import BlogPostsService from "../../services/BlogPostsService";

export const BloggerDetails = () => {
  const { bloggerId, weekNum } = useParams(); 
  const [name, setName] = useState("");
  const [checked, setChecked] = useState([]);
  const history = useHistory();

  const [posts, setPosts] = useState([]);
  const { blogposts } = useBlogposts();

  useEffect(() => {
    BlogPostsService.getBlogposts(bloggerId).then((data) => {
      setPosts(data);
    });
  }, [blogposts, bloggerId]);

  useEffect(() => {
    BloggersService.getBloggerData(bloggerId).then((data) => {
      setName(data.name);
      setChecked(data.checked);
    });
  }, [bloggerId]);

  const save = () => {
    BloggersService.updateBloggerData(bloggerId, name, checked);
  };

  const deleteBlogger = () => {
    BloggersService.flagDeleted(bloggerId);
    history.push("/bloggers");
  };

  const render = () => {
    return weekNum ? <WeekView week={weekNum} /> : <GeneralView />;
  };
  return (
    <Pane display="flex" >
      <BlogPostsList bloggerData={name} posts={posts} width={400} weekNum={weekNum} />

      {render()}
    </Pane>
  );
};
