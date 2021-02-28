import React from "react";
import { Route, Switch } from "react-router";
import { Pane } from "evergreen-ui";
import { SidebarComponent } from "../../components/Sidebar";
import { AddBloggerPage } from "./AddBloggerPage";
import { BloggersList } from "./BloggersList";
import { BloggerDetails } from "./BloggerDetails";
import { BlogCategoriesPage } from "./BlogCategoriesPage";

export const BloggersPage = ({ match }) => {
  return (
    <Pane display="flex">
      <SidebarComponent />
      <BloggersList />
      <Switch>
        <Route exact path={`${match.url}/add`} component={AddBloggerPage} />

        <Route
          exact
          path={`${match.url}/:bloggerId/allmant`}
          component={BloggerDetails}
        />

        <Route
          exact
          path={`${match.url}/:bloggerId/week/:weekNum`}
          component={BloggerDetails}
        />

        <Route /* HÄR */
          exact
          path={`${match.url}/categories`}
          component={BlogCategoriesPage}
        />
        
      </Switch>
    </Pane>
  );
};
