import React from "react";
import { Pane, Heading, Avatar, Popover, Position, Menu } from "evergreen-ui";

import { LanguageDropdown } from "../LanguageDropdown";

import firebase from "../../firebase";

export const TopHeader = ({ title, userName }) => {
  const signout = () => {
    firebase.auth().signOut();
  };

  return (
    <Pane display="flex" padding={20} borderBottom="1px solid #f0f0f0">
      <Pane flex={1} alignItems="center" display="flex">
        <Heading>{title}</Heading>
      </Pane>
      <Pane
        flex={1}
        flexGrow={0}
        alignItems="center"
        display="flex"
        paddingRight={20}
      >
        <LanguageDropdown />
      </Pane>
      <Pane>
        <Popover
          position={Position.BOTTOM_RIGHT}
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon="log-out" onSelect={signout}>
                  Logga ut
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <Avatar name={userName} size={32} cursor="pointer" />
        </Popover>
      </Pane>
    </Pane>
  );
};
