import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Menu, TextInputField, Button, Checkbox } from "evergreen-ui";
import { BlogPostsList } from "./BlogPostsList";
import { ContextMenu } from "../../components/ContextMenu";
import BlogPostsService from "../../services/BlogPostsService";
import {WeekViewForm} from "./WeekViewForm";

export const WeekView = ({week}) => {
  const { bloggerId  } = useParams(); 
  const [postExist, setPostExist] = useState(false)
  const [blogPostId, setBlogPostId] = useState(null);
  const [blogPostTitle, setBlogPostTitle] = useState("");
  const [blogPostDescription, setBlogPostDescription] = useState("");
  const [blogPostUrl, setBlogPostUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const history = useHistory();

  useEffect(() => {
    (BlogPostsService.getBlogpost(bloggerId, Number(week)).then(data => {
      if(data.length !== 0){
        setPostExist(true)
        setBlogPostId(data[0].id)
        setBlogPostTitle(data[0].title)
        setBlogPostDescription(data[0].description)
        setBlogPostUrl(data[0].url)
        setImageUrl(data[0].imageUrl)
      }else{
        setPostExist(false)
        setBlogPostId(null)
        setBlogPostTitle("")
        setBlogPostDescription("")
        setBlogPostUrl("")
        setImageUrl("")
      }
    }))
  }, [week]);

  const save = () => {
    const data = {title: blogPostTitle, description: blogPostDescription, url: blogPostUrl, imageUrl}
    if(blogPostId){
      BlogPostsService.updateBlogPost(blogPostId, data)
    }else{
      BlogPostsService.addNewBlogPost(bloggerId, week, data)
    }
  }

  const deletePost = () => {
    if(blogPostId !== null){
      BlogPostsService.deleteBlogPost(blogPostId)
      history.push(`/bloggers/${bloggerId}/allmant`)
    }
  }

  return (
    <Pane display="flex" width={600}>
      <Pane width={500} backgroundColor="white">
        <ContextMenu
          title={`Vecka ${week}`}
        />
        <Checkbox
          checked={postExist}
          onChange={e => setPostExist(e.target.checked)}
          margin={10}
          label={`Blogginlägg finns för vecka ${week}`}
        />
        <Menu.Divider />

        {postExist ? <WeekViewForm
          blogPostId={blogPostId}
          setBlogPostId={setBlogPostId}
          blogPostTitle={blogPostTitle}
          setBlogPostTitle={setBlogPostTitle}
          blogPostDescription={blogPostDescription}
          setBlogPostDescription={setBlogPostDescription}
          blogPostUrl={blogPostUrl}
          setBlogPostUrl={setBlogPostUrl}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}/> : null}
        <Button intent="success" appearance="primary" onClick={postExist ? save : deletePost}>
          Spara
        </Button>
      </Pane>
    </Pane>
  );
};
