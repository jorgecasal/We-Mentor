import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { TopHeader } from "./components/TopHeader";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { TrashPage } from "./pages/TrashPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ChildMonthsPage } from "./pages/ChildMonthsPage";
import { PregnancyWeeksPage } from "./pages/PregnancyWeeksPage";
import { ChecklistPage } from "./pages/ChecklistPage";
import { ContentPage } from "./pages/ContentPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { BloggersPage } from "./pages/BloggersPage";
import { PodcastsPage } from "./pages/PodcastsPage";
import { QuestionsPage } from "./pages/QuestionsPage";
import { PopularPage } from "./pages/PopularPage";
import { OffersPage } from "./pages/OffersPage";
import { ModalProvider } from "react-modal-hook";

import { FirebaseAuthProvider } from "./context/FirebaseAuthProvider";
import { SelectedLanguageProvider } from "./context/language";


function App() {
  const details = {
    button: {
      link: "google.com",
      text: "click hereeee"
    },
    company: "yaldar",
    terms: "the terms here"
  }

  return (
    <FirebaseAuthProvider>
      <ModalProvider>
        <SelectedLanguageProvider>
          <TopHeader title="Baby Journey CMS" userName="Peter Leinonen" />
          <Router>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <ProtectedRoute path="/checklist" component={ChecklistPage} />
              <ProtectedRoute path="/content" component={ContentPage} />
              <ProtectedRoute path="/podcasts" component={PodcastsPage} />
              <ProtectedRoute path="/bloggers" component={BloggersPage} />
              <ProtectedRoute path="/months" component={ChildMonthsPage} />
              <ProtectedRoute path="/articles" component={ArticlesPage} />
              <ProtectedRoute path="/offers" component={OffersPage} />
              <ProtectedRoute path="/weeks" component={PregnancyWeeksPage} />
              <ProtectedRoute path="/popular" component={PopularPage} />
              <ProtectedRoute path="/questions" component={QuestionsPage} />
              <ProtectedRoute path="/trash" component={TrashPage} />
              <ProtectedRoute component={DashboardPage} />
            </Switch>
          </Router>
        </SelectedLanguageProvider>
      </ModalProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
