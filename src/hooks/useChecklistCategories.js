/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import arrayMove from "array-move";

import { useSelectedLanguage } from "../context/language";
import ChecklistService from "../services/ChecklistService";

export const useChecklistCategories = () => {
  const { selectedLanguage } = useSelectedLanguage();
  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    if (selectedLanguage) {
      ChecklistService.getCategories(selectedLanguage)
        .then(cats => {
          setCategories(cats);
        })
        .catch(ex => console.log(ex));
    }
  };

  const updateSortOrder = ({ oldIndex, newIndex, collection }) => {
    const categoriesUpdated = arrayMove(categories, oldIndex, newIndex);
    setCategories(categoriesUpdated);

    let count = 0;
    Promise.all(
      categoriesUpdated.map(category => {
        category.sortOrder = count++;
        return ChecklistService.updateCategory(selectedLanguage, category);
      })
    )
      .then(() => {
        console.log("Updated sort order");
      })
      .catch(() => {
        console.log("Error updating sort order");
      });
  };

  useEffect(() => {
    // Return cleanup function to unsubscribe
    return ChecklistService.subscribeToCheckistCategories(
      selectedLanguage,
      (err, categories) => {
        if (err) {
          console.log("Error loading categories");
        } else {
          setCategories(categories);
        }
      }
    );
  }, [selectedLanguage]);

  return {
    categories,
    loadCategories,
    updateSortOrder
  };
};
