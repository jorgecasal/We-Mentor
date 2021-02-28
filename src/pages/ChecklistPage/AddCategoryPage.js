/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Pane, Button, TextInputField } from "evergreen-ui";
import { useHistory } from "react-router-dom";

import { ContextMenu } from "../../components/ContextMenu";

import { useChecklistAddCategory } from "../../hooks/useChecklistAddCategory";

export const AddCategoryPage = () => {
  const history = useHistory();
  const {
    categoryName,
    setCategoryName,
    addNewCategory
  } = useChecklistAddCategory();

  return (
    <Pane width={600}>
      <ContextMenu title="Lägg till ny kategori" />
      <Pane padding={20}>
        <TextInputField
          label="Kategorinamn"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
        />
      </Pane>

      <Pane
        position="absolute"
        bottom={0}
        padding={20}
        borderTop="1px solid #e0e0e0"
        width="100%"
      >
        <Button marginRight={20} onClick={() => history.goBack()}>
          Avbryt
        </Button>
        <Button intent="success" appearance="primary" onClick={addNewCategory}>
          Lägg till
        </Button>
      </Pane>
    </Pane>
  );
};
