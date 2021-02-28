import React from "react";
import { Pane, Menu } from "evergreen-ui";
import { useHistory /*, NavLink */ } from "react-router-dom";

import theme from "../../theme";

export const SidebarComponent = () => {
  const history = useHistory();

  return (
    <Pane
      width={250}
      // height="100vh"
      backgroundColor={theme.colors.grey1}
      padding={20}
    >
      <Menu>
        <Menu.Item onSelect={() => history.push("/dashboard")}>Start</Menu.Item>
        <Menu.Item onSelect={() => history.push("/weeks")}>Gravid</Menu.Item>
        <Menu.Item onSelect={() => history.push("/months")}>Barn</Menu.Item>
        <Menu.Item onSelect={() => history.push("/checklist")}>
          Att göra
        </Menu.Item>
        <Menu.Item onSelect={() => history.push("/content")}>
          Infosidor
        </Menu.Item>
        <Menu.Item onSelect={() => history.push("/bloggers")}>
          Bloggar
        </Menu.Item>
        <Menu.Item onSelect={() => history.push("/podcasts")}>Poddar</Menu.Item>
        <Menu.Item onSelect={() => history.push("/articles")}>Artiklar</Menu.Item>
        <Menu.Item onSelect={() => history.push("/offers")}>Erbjudanden</Menu.Item>
        <Menu.Item onSelect={() => history.push("/popular")}>Populärt</Menu.Item>
        <Menu.Item onSelect={() => history.push("/questions")}>Vanliga frågor</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          // position="absolute"
          // bottom={0}
          icon="trash"
          onSelect={() => history.push("/trash")}
        >
          Papperskorg
        </Menu.Item>
      </Menu>
    </Pane>
  );
};

export default SidebarComponent;
