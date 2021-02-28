import React from "react";
import { Route } from "react-router";
import { Pane } from "evergreen-ui";

import { SidebarComponent } from "../../components/Sidebar";
import { WeekDetails } from "./WeekDetails";
import { WeekList } from "./WeekList";

export const PregnancyWeeksPage = () => {
  return (
    <Pane display="flex">
      <SidebarComponent />
      <WeekList />

      <Route path="/weeks/:weekId" component={WeekDetails} />
    </Pane>
  );
};
