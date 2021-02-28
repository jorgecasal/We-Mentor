import React from "react";
import { Route } from "react-router";
import { Pane } from "evergreen-ui";

import { SidebarComponent } from "../../components/Sidebar";
import { MonthDetails } from "./MonthDetails";
import { MonthList } from "./MonthList";

export const ChildMonthsPage = () => {
  return (
    <Pane display="flex">
      <SidebarComponent />
      <MonthList />
      <Route path="/months/:monthId" component={MonthDetails} />
    </Pane>
  );
};
