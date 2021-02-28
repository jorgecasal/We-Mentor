import React from "react";
import { Pane } from "evergreen-ui";
import { SidebarComponent } from "../../components/Sidebar";

export const DashboardPage = () => {
  return (
    <Pane display="flex">
      <SidebarComponent />
    </Pane>
  );
};
