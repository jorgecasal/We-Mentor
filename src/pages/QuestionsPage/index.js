import React from "react";
import { Route, Switch } from "react-router";
import { Pane } from "evergreen-ui";

import { SidebarComponent } from "../../components/Sidebar";
import { AddQuestionsPage } from "./AddQuestionsPage";
import { QuestionDetails } from "./QuestionDetails";
import { QuestionsList } from "./QuestionsList";

export const QuestionsPage = ({ match }) => {
  return (
    <Pane display="flex">
      <SidebarComponent />
      <QuestionsList />
      <Switch>
        <Route exact path={`${match.url}/add`} component={AddQuestionsPage} />
        <Route
          exact
          path={`${match.url}/:questionId`}
          component={QuestionDetails}
        />

      </Switch>
    </Pane>
  );
};
