import React from "react";
import { Pane } from "evergreen-ui";
import { SidebarComponent } from "../../components/Sidebar";
import { PopularDetails } from "./PopularDetails";

export const PopularPage = ({ match }) => {

  return (
    <Pane display="flex">
      <SidebarComponent />
      <PopularDetails />
    </Pane>
  );
};
