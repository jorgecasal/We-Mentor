import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import { Menu, Pane, Heading } from "evergreen-ui";
import theme from "../../theme";
import { useParams } from "react-router";
import ArticlesService from "../../services/ArticlesService";
import ArticleCategoriesService from "../../services/ArticleCategoriesService";
import { useArticles } from "../../hooks/useArticles";

export const ArticlesList = () => {
  const history = useHistory();
  const { articleCat, articleId } = useParams();
  const { articles, setArticles } = useArticles();
  const [category, setCategory] = useState("");
  useEffect(() => {
    ArticleCategoriesService.getArticleCategory(articleCat).then(data => {
      setCategory(data.translations.sv.title);
    });
  }, [articleCat]);

  const render = () => {
    const wantedArticles = articles.filter(el => {
      console.log(el);
      return el.categoryId == articleCat && !el.deleted
    });
    return wantedArticles.map(article => (
      <Menu.Item
        onSelect={() => {
          history.push(`/articles/${articleCat}/${article.id}`);
        }}
      >
        {article.title}
      </Menu.Item>
    ));
  };

  return (
    <Pane width={250} padding={20} backgroundColor={theme.colors.grey3}>
      <Heading>{category ? category : ""}</Heading>
      <Pane>
        <Menu.Item
          key={articleCat}
          whiteSpace="nowrap"
          overflow="hidden"
          onSelect={() => {
            history.push(`/articles/${articleCat}/allmant`);
          }}
        >
          Allmänt
        </Menu.Item>
        <Menu.Divider />
        {render()}
        <Menu.Item
          whiteSpace="nowrap"
          overflow="hidden"
          icon="add"
          onSelect={() => history.push(`/articles/${articleCat}/add`)}
        >
          Lägg till ny artikel
        </Menu.Item>
      </Pane>
    </Pane>
  );
};
