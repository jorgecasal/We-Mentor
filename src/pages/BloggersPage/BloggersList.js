import React from "react";
import { Pane, Menu, Heading } from "evergreen-ui";
import theme from "../../theme";
import { useBloggersList } from "../../hooks/useBloggersList";
import { useHistory, Switch, Route } from "react-router";

export const BloggersList = ({ match }) => {
  const { bloggersList } = useBloggersList();

  const history = useHistory();
  return (
    <Pane width={250} backgroundColor={theme.colors.grey2} padding={20}>
      <Switch></Switch>
      <Heading>Bloggar</Heading>
      <Menu.Item
        whiteSpace="nowrap"
        overflow="hidden"
        onSelect={() => {
          history.push(`/bloggers/categories`); /* HÄR */
        }}
      >
        Bloggkategorier
      </Menu.Item>
      <Menu.Divider />
      <Pane>
        {bloggersList.length > 0 && (
          <Menu>
            {bloggersList.map((blogger) => (
              <Menu.Item
                key={blogger.id}
                whiteSpace="nowrap"
                overflow="hidden"
                onSelect={() => {
                  history.push(`/bloggers/${blogger.id}/allmant`);
                }}
              >
                {blogger.name || blogger.id}
              </Menu.Item>
            ))}
            <Menu.Divider />
          </Menu>
        )}
        <Menu.Item
          whiteSpace="nowrap"
          overflow="hidden"
          icon="add"
          onSelect={() => history.push("/bloggers/add")}
        >
          Lägg till ny bloggare
        </Menu.Item>
      </Pane>
    </Pane>
  );
};
