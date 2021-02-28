import React from "react";
import { Route, Switch } from "react-router";
import { Pane } from "evergreen-ui";

import { SidebarComponent } from "../../components/Sidebar";

import { SeasonsList } from "./SeasonList";

import { EpisodeDetailsPage } from "./EpisodeDetailsPage";
import { SeasonDetailsPage } from "./SeasonDetailsPage";

import { AddEpisodePage } from "./AddEpisodePage";
import { AddSeasonPage } from "./AddSeasonPage";
import { PodcastProvider } from "../../context/usePodcast";

export function PodcastsPage({ match }) {
  return (
    <PodcastProvider>
      <Pane display="flex">
        <SidebarComponent />

        <SeasonsList />

        <Switch>
          <Route exact path={`${match.url}/add`} component={AddSeasonPage} />

          <Route
            exact
            path={`${match.url}/add/:seasonId`}
            component={AddEpisodePage}
          />

          <Route
            exact
            path={`${match.url}/:seasonId`}
            component={SeasonDetailsPage}
          />

          <Route
            exact
            path={`${match.url}/:seasonId/:episodeId`}
            component={EpisodeDetailsPage}
          />
        </Switch>
      </Pane>
    </PodcastProvider>
  );
}
