import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Menu, TextInputField, Textarea, Label, Button, Checkbox } from "evergreen-ui";
import { ContextMenu } from "../../components/ContextMenu";
import {ArticlesList} from "./ArticlesList"
import ArticlesService from "../../services/ArticlesService";
import ArticleCategoriesService from "../../services/ArticleCategoriesService"

export const AddArticlePage = () => {
  const { articleCat } = useParams();
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [intro, setIntro] = useState("")
  const [body, setBody] = useState("")
  const [verifiedBy, setVerifiedBy] = useState("");
  const [catTitle, setCatTitle] = useState(""); 
  const history = useHistory();
  
  useEffect(() => {
    ArticleCategoriesService.getArticleCategory(articleCat).then((data) => {
      setCatTitle(data.translations.sv.title);
    });
  }, []);

  const save = () => {

    if(title===""){
      window.alert("please provide a title")
    } else {
      const data = {
        title,
        imageUrl,
        intro,
        body,
        verifiedBy,
        categoryId: articleCat
      };
      ArticlesService.addNewArticle(data).then(data=>{
        history.push(`/articles/${articleCat}/${data.id}`)
      });
    }
    
  };



  return (
    <Pane display="flex">
        <Pane width={500} backgroundColor="white">
            <p>Add article to category: {catTitle}</p>
                <ContextMenu
                title={title}
                />
                <Menu.Divider />
        
                <Pane padding={20}>
                <TextInputField
                    label="Titel"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextInputField
                    label="Omslag url"
                    name="Text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />
                </Pane>
                <Pane padding={20}>
                <Label
                    htmlFor="textarea-2"
                    marginBottom={4}
                    display="block"
                >
                    Ingress
                </Label>
                <Textarea
                    label="Länk till bild"
                    value={intro}
                    onChange={e => setIntro(e.target.value)}
                />
                </Pane>
                <Pane padding={20}>
                <Label
                    htmlFor="textarea-2"
                    marginBottom={4}
                    display="block"
                >
                    Brödtext
                </Label>
                <Textarea
                    label="Titel"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
                <TextInputField
                    label="Verifierad av"
                    name="Text"
                    value={verifiedBy}
                    onChange={e => setVerifiedBy(e.target.value)}
                />
                </Pane>
                <Button intent="success" appearance="primary" onClick={save}>
                    Spara
                </Button>
            </Pane>
        </Pane>
  );
};
