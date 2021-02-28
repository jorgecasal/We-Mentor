import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import {
  Menu,
  Pane,
  TextInputField,
  Label,
  Textarea,
  Button
} from "evergreen-ui";
import ArticlesService from "../../services/ArticlesService";
import { ContextMenu } from "../../components/ContextMenu";

export const ArticleView = ({ articleCat }) => {
  const { articleId } = useParams();
  const [articleData, setArticleData] = useState({
    title: "",
    intro: "",
    body: "",
    verifiedBy: "",
    imageUrl: ""
  });
  const history = useHistory();

  useEffect(() => {
    ArticlesService.getArticle(articleId).then(data => {
      if (data) {
        setArticleData({
          title: data.title ? data.title : "",
          intro: data.intro ? data.intro : "",
          body: data.body ? data.body : "",
          verifiedBy: data.verifiedBy ? data.verifiedBy : "",
          imageUrl: data.imageUrl ? data.imageUrl : ""
        });
      } else {
        setArticleData({
          title: "",
          intro: "",
          body: "",
          verifier: "",
          imageUrl: ""
        });
      }
    });
  }, [articleId]);

  const save = () => {
    const data = {
      title: articleData.title,
      imageUrl: articleData.imageUrl,
      intro: articleData.intro,
      body: articleData.body,
      verifiedBy: articleData.verifiedBy,
      categoryId: articleCat
    };
    ArticlesService.updateArticle(articleId, data);
  };

  const deleteArticle = () => {
    if (articleId !== null) {
      ArticlesService.flagDeleted(articleId);
      history.push(`/articles/${articleCat}/allmant`);
    }
  };

  return (
    <Pane width={500} backgroundColor="white">
      <ContextMenu
        title={`Artikel: ${articleData.title}`}
        menu={
          <Menu>
            <Menu.Group>
              <Menu.Item icon="trash" intent="danger" onSelect={deleteArticle}>
                Ta bort
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      />

      <Menu.Divider />

      <Pane padding={20}>
        <TextInputField
          label="Titel"
          value={articleData.title}
          onChange={e =>
            setArticleData({ ...articleData, title: e.target.value })
          }
        />
        <TextInputField
          label="Omslag url"
          name="Text"
          value={articleData.imageUrl}
          onChange={e =>
            setArticleData({ ...articleData, imageUrl: e.target.value })
          }
        />
      </Pane>
      <Pane padding={20}>
        <Label htmlFor="textarea-2" marginBottom={4} display="block">
          Ingress
        </Label>
        <Textarea
          label="Länk till bild"
          value={articleData.intro}
          onChange={e =>
            setArticleData({ ...articleData, intro: e.target.value })
          }
        />
      </Pane>
      <Pane padding={20}>
        <Label htmlFor="textarea-2" marginBottom={4} display="block">
          Brödtext
        </Label>
        <Textarea
          label="Titel"
          value={articleData.body}
          onChange={e =>
            setArticleData({ ...articleData, body: e.target.value })
          }
        />
        <TextInputField
          label="Verifierad av"
          name="Text"
          value={articleData.verifiedBy}
          onChange={e =>
            setArticleData({ ...articleData, verifiedBy: e.target.value })
          }
        />
      </Pane>
      <Button intent="success" appearance="primary" onClick={save}>
        Spara
      </Button>
    </Pane>
  );
};
