import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Menu, TextInputField, Textarea, Label, Button, Checkbox } from "evergreen-ui";
import { ContextMenu } from "../../components/ContextMenu";
import ArticleCategoriesService from "../../services/ArticleCategoriesService";

export const AddArticleCategoryPage = () => {
  const { articleCat } = useParams(); //retrieves a certain part of the url to use as part of routing blabla
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [context, setContext] = useState("sv")
  const [checked, setChecked] = useState(true)
  const [icon, setIcon] = useState("");
  const [template,setTemplate] = useState("");
  const history = useHistory();


  const save = () => {

    if(title===""){
      window.alert("please provide a title")
    } else {
      const data = {
        title,
        description,
        show: checked,
        icon,
        template
      };
      ArticleCategoriesService.addNewArticleCategory(context, data).then(data=>{
        history.push(`/articles/${data.id}/allmant`)
        history.go()
      });
    }
  };

  return (
    <Pane display="flex" width={600}>
      <Pane width={500} backgroundColor="white">
        <ContextMenu
          title={title}
          menu={
            <Menu>
              <Menu.Group>
                <Menu.Item
                  icon="trash"
                  intent="danger"
                  //   onSelect={deleteBlogger}
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setTemplate(e.target.value)}
          />
          <TextInputField
            label="Ikon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          <Checkbox
            checked={checked}
            onChange={(e)=> setChecked(e.target.checked)}
            margin={10}
            label="Synlig på upptäckt"
        />
        <Button intent="success" appearance="primary" onClick={save} >
          Spara
        </Button>
      </Pane>
    </Pane>
  );
};
