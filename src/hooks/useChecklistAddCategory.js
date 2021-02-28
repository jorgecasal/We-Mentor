/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { toaster } from "evergreen-ui";
import { useHistory } from "react-router-dom";

import { useChecklistCategories } from "./useChecklistCategories";
import ChecklistService from "../services/ChecklistService";

export const useChecklistAddCategory = () => {
  const history = useHistory();
  const { categories } = useChecklistCategories();
  const [categoryName, setCategoryName] = useState("");

  const addNewCategory = () => {
    const sortOrder = categories.length + 1;
    ChecklistService.addCategory("sv", categoryName, sortOrder)
      .then(({ id }) => {
        history.push(`/checklist/edit/${id}`);
      })
      .catch(error => {
        toaster.danger("Kunde inte skapa kategori");
        console.error("Error writing document: ", error);
      });
  };

  return {
    categoryName,
    setCategoryName,
    addNewCategory
  };
};
