import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import {
  Pane,
  Menu,
  TextInputField,
  Textarea,
  Label,
  Checkbox,
  Button
} from "evergreen-ui";
import { ContextMenu } from "../../components/ContextMenu";
import ArticleCategoriesService from "../../services/ArticleCategoriesService";

export const GeneralView = () => {
  const { articleCat } = useParams();
  const [category, setCategory] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);
  const [icon, setIcon] = useState("");
  const [template, setTemplate] = useState("");
  const history = useHistory();
  const [context, setContext] = useState("sv");
  useEffect(() => {
    ArticleCategoriesService.getArticleCategory(articleCat).then(data => {
      console.log("asdfasdf", data.translations[context].description, articleCat)
      setTitle(data.translations[context].title);
      setDescription(data.translations[context].description !== undefined ? data.translations[context].description : " ");
      setChecked(data.show);
      setIcon(data.icon || "");
      setTemplate(data.template || "");
    });
  }, [articleCat]);

  const save = () => {
    const data = {
      show: checked,
      icon,
      template,
      title,
      description
    };

    ArticleCategoriesService.updateCategory(articleCat, context, data);
  };

  const deleteCategory = () => {
    ArticleCategoriesService.flagDeleted(articleCat, true);
    history.push("/articles");
  };

  return (
    <Pane display="flex" width={600}>
      <Pane width={500} backgroundColor="white">
        <ContextMenu
          title={`Kategori: ${title}`}
          menu={
            <Menu>
              <Menu.Group>
                <Menu.Item
                  icon="trash"
                  intent="danger"
                  onSelect={deleteCategory}
                >
                  Ta bort
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        />
        <Pane padding={20}>
          <TextInputField
            label="Kategori"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Label htmlFor="Beskrivning" marginBottom={4} display="block">
            Beskrivning
          </Label>
          <Textarea
            name="Beskrivning"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Pane>
        <TextInputField
          label="Mall"
          value={template}
          onChange={e => setTemplate(e.target.value)}
        />
        <TextInputField
          label="Ikon"
          value={icon}
          onChange={e => setIcon(e.target.value)}
        />
        <Checkbox
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          margin={10}
          label="Synlig på upptäckt"
        />
        <Button intent="success" appearance="primary" onClick={save}>
          Spara
        </Button>
      </Pane>
    </Pane>
  );
};
