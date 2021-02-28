import React from "react";
import { useParams, useHistory } from "react-router";
import { Pane } from "evergreen-ui";
import { ArticlesList } from "./ArticlesList";
import { GeneralView } from "./GeneralView";
import { ArticleView } from "./ArticleView";

export const ArticleDetails = () => {
  const { articleCat, articleId } = useParams();
  const history = useHistory();

  const render = () => {
    return articleId ? <ArticleView articleCat={articleCat} /> : <GeneralView />;
  };
  return (
    <Pane display="flex" >
      <ArticlesList width={400}/>
        {render()}
    </Pane>
  );
};
