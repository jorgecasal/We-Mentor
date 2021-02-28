import React from "react";
import { Route, Switch } from "react-router";
import { Pane } from "evergreen-ui";

import { SidebarComponent } from "../../components/Sidebar";

import { AddContentPage } from "./AddContentPage";
import { ContentDetails } from "./ContentDetails";

import { ContentList } from "./ContentList";

export const ContentPage = ({ match }) => {
  return (
    <Pane display="flex">
      <SidebarComponent />
      <ContentList />
      <Switch>
        <Route exact path={`${match.url}/add`} component={AddContentPage} />
        <Route
          exact
          path={`${match.url}/:contentId`}
          component={ContentDetails}
        />

      </Switch>
    </Pane>
  );
};
