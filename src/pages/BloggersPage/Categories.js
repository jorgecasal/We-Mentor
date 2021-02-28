import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Pane,
} from "evergreen-ui";

import BlogCategoriesService from "../../services/BlogCategoriesService";

export const Categories = ({ checked, setChecked }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    BlogCategoriesService.getCategories().then(setCategories);
  }, []);

  const t = (e) => {
    if (e.target.tagName === "INPUT" && checked.includes(e.target.id)) {
      setChecked(
         [...checked.filter((el) => el !== e.target.id)]);
    } else if (e.target.id) {
      setChecked([...checked, e.target.id]);
    }
  };

  const renderCategories = () =>
    categories.map((cat) => {
      return (
        <Checkbox
          id={cat.id}
          checked={checked.includes(cat.id)}
          onClick={t}
          margin={10}
          label={cat.translations.sv}
        />
      );
    });

  return (
    <Pane display="flex" width={100}>
      {renderCategories()}
    </Pane>
  );
};
