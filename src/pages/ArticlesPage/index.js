import React from "react";
import { Route, Switch } from "react-router";
import { Pane } from "evergreen-ui";
import { SidebarComponent } from "../../components/Sidebar";
import { AddArticleCategoryPage } from "./AddArticleCategoryPage";
import { AddArticlePage } from "./AddArticlePage";

import { ArticleCategoriesList } from "./ArticleCategoriesList";
import { ArticleDetails } from "./ArticleDetails";

export const ArticlesPage = ({ match }) => {
  return (
    <Pane display="flex">
      <SidebarComponent />
      <ArticleCategoriesList />
      <Switch>
        <Route exact path={`${match.url}/add`} component={AddArticleCategoryPage} />
        <Route exact path={`${match.url}/:articleCat/add`} component={AddArticlePage} />
        <Route
          exact
          path={`${match.url}/:articleCat/allmant`}
          component={ArticleDetails}
        />
        
        <Route
          exact
          path={`${match.url}/:articleCat/:articleId`}
          component={ArticleDetails}
        />
      </Switch>
    </Pane>
  );
};
