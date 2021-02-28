import React from "react";
import { Pane, Menu, Heading } from "evergreen-ui";

import theme from "../../theme";

import { useContentList } from "../../hooks/useContentList";
import { useHistory } from "react-router";

export const ContentList = () => {
  const { contentList } = useContentList();

  const history = useHistory();

  return (
    <Pane
      width={250}
      height="100vh"
      backgroundColor={theme.colors.grey2}
      padding={20}
    >
      <Heading>Infosidor</Heading>

      <Pane>
        {contentList.length > 0 && (
          <Menu>
            {contentList.map(doc => (
              <Menu.Item
                key={doc.id}
                whiteSpace="nowrap"
                overflow="hidden"
                onSelect={() => {
                  history.push(`/content/${doc.id}`);
                }}
              >
                {doc.name || doc.id}
              </Menu.Item>
            ))}
            <Menu.Divider />
          </Menu>
        )}
        <Menu.Item
              whiteSpace="nowrap"
              overflow="hidden"
              icon="add"
              onSelect={() => history.push("/content/add")}
            >
              Lägg till ny infosida
            </Menu.Item>
      </Pane>
    </Pane>
  );
};
