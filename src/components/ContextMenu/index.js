import React from "react";
import { Pane, Popover, Heading, Position, IconButton } from "evergreen-ui";

export const ContextMenu = ({ title, menu }) => {
  return (
    <Pane display="flex" padding={20} borderBottom="1px solid #f0f0f0">
      <Pane flex={1} alignItems="center" display="flex">
        <Heading>{title}</Heading>
      </Pane>
      {menu && (
        <Pane>
          <Popover position={Position.BOTTOM_RIGHT} content={menu}>
            <IconButton icon="more" />
          </Popover>
        </Pane>
      )}
    </Pane>
  );
};
