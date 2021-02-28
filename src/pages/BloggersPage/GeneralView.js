import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Menu, TextInputField, Button } from "evergreen-ui";
import { BlogPostsList } from "./BlogPostsList";
import { ContextMenu } from "../../components/ContextMenu";
import BloggersService from "../../services/BloggersService";
import { Categories } from "./Categories";

export const GeneralView = () => {
  const { bloggerId } = useParams(); 
  const [name, setName] = useState("");
  const [checked, setChecked] = useState([]);
  const history = useHistory();

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

  return (
    <Pane display="flex" width={600}>
      <Pane width={500} backgroundColor="white">
        <ContextMenu
          title={name}
          menu={
            <Menu>
              <Menu.Group>
                <Menu.Item
                  icon="trash"
                  intent="danger"
                  onSelect={deleteBlogger}
                >
                  Ta bort
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        />
        <Pane padding={20}>
          <TextInputField
            label="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Pane>
        <Categories checked={checked} setChecked={setChecked} />
        <Button intent="success" appearance="primary" onClick={save}>
          Spara
        </Button>
      </Pane>
    </Pane>
  );
};
