import React, {useEffect, useState} from "react";
import { Pane, Menu, Heading } from "evergreen-ui";
import theme from "../../theme";
import {useArticleCategoriesList} from "../../hooks/useArticleCategoriesList";
import { useHistory, Switch, useParams } from "react-router";
import ArticleCategoriesService from "../../services/ArticleCategoriesService"

export const ArticleCategoriesList = () => {
  const { articleCatetgoriesList, setArticleCategoriesList } = useArticleCategoriesList();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [context, setContext] = useState("sv");
  const { articleCat } = useParams(); 

  const history = useHistory();
  return (
    <Pane
      width={250}
      backgroundColor={theme.colors.grey2}
      padding={20}
    >
      <Switch>
      </Switch>
      <Heading>Artikel kategorier</Heading>
      <Menu.Divider />
      <Pane>
        {articleCatetgoriesList && articleCatetgoriesList.length > 0 && (
          <Menu>
            {articleCatetgoriesList.map(category => (
              <Menu.Item
                key={category.id}
                whiteSpace="nowrap"
                overflow="hidden"
                onSelect={() => {
                  history.push(`/articles/${category.id}/allmant`);
                }}
              >
                {category.translations["sv"].title || category.id}
              </Menu.Item>
            ))}
            <Menu.Divider />
          </Menu>
        )}
        <Menu.Item
              whiteSpace="nowrap"
              overflow="hidden"
              icon="add"
              onSelect={() => history.push("/articles/add")}
            >
              Lägg till ny kategori
        </Menu.Item>
      </Pane>
    </Pane>
  );
};
