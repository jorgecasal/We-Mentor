import React from "react";
import { Pane, Menu, Heading } from "evergreen-ui";
import { useHistory } from "react-router";

import theme from "../../theme";
import { usePodcastContext } from "../../context/usePodcast";

export function SeasonsList() {
  const { seasons } = usePodcastContext();
  const history = useHistory();

  return (
    <Pane
      width={250}
      height="100vh"
      padding={20}
      backgroundColor={theme.colors.grey2}
    >
      <Heading>Poddar</Heading>

      <hr />

      <Pane>
        {seasons.length > 0 && (
          <Menu>
            {seasons.map(season => (
              <Menu.Item
                key={season.id}
                onSelect={() => {
                  history.push(`/podcasts/${season.id}`);
                }}
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {season.title}
              </Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item
              icon="add"
              onSelect={() => {
                history.push(`/podcasts/add`);
              }}
            >
              Lägg till ny säsong
            </Menu.Item>
          </Menu>
        )}
      </Pane>
    </Pane>
  );
}
