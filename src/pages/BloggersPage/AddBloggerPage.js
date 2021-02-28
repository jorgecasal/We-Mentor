import React, { useState } from "react";
import { Pane, Button, TextInputField } from "evergreen-ui";

import { useHistory } from "react-router";

import BloggerService from "../../services/BloggersService";
import { ContextMenu } from "../../components/ContextMenu";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

const useAddContent = () => {
  const history = useHistory();
  const [newBlogger, setNewBlogger] = useState("");

  const addBlogger = async () => {
    try {
      const bloggerId = (await BloggerService.addNewBlogger(newBlogger)).id;
      history.push(`/bloggers/${bloggerId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    newBlogger,
    setNewBlogger,
    addBlogger
  };
};

export function AddBloggerPage() {
  const history = useHistory();
  const { newBlogger, setNewBlogger, addBlogger } = useAddContent();

  return (
    <Pane width={600}>
      <ContextMenu title="Lägg till ny bloggare" />
      <Pane padding={20}>
        <TextInputField
          label="Namn för innehåll"
          value={newBlogger}
          onChange={e => setNewBlogger(e.target.value)}
        />
      </Pane>

      <BottomButtonWrapper>
        <Button marginRight={10} onClick={() => history.goBack()}>
          Avbryt
        </Button>
        <Button appearance="primary" intent="success" onClick={addBlogger}>
          Lägg till bloggare
        </Button>
      </BottomButtonWrapper>
    </Pane>
  );
}
