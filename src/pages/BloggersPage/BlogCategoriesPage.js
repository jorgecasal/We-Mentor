import React, { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Heading,
  Menu,
  Pane,
  Spinner,
  TextInput,
  Table,
  toaster,
} from "evergreen-ui";

import BlogCategoriesService from "../../services/BlogCategoriesService";
import { createFirestoreId } from "../../utils/firebase";

const useEditCategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    BlogCategoriesService.getCategories()
      .then((data) => {
        console.log("DATA", data);
        setCategoryList(
          data.map((el) => {
            return {
              ...el,
              translations: {
                en: el.translations.en,
                sv: el.translations.sv,
              },
            };
          })
        );
      })
      .catch((err) => {
        console.log("Unable to load categories", err);
      });
  }, []);

  const onChangeNewCategory = (value) => {
    setValue(value);
  };

  const onAddCategory = async () => {
    const item = {
      id: createFirestoreId(),
      translations: {
        en: value,
        sv: value,
      },
    };

    try {
      await BlogCategoriesService.addNewCategory(item.id, value, value);
      toaster.success(`Kategorin lades till.`);
    } catch (error) {
      console.log("Error saving category", error);
    }

    setCategoryList([...categoryList, item]);
    setValue("");
  };

  const onDeleteCategory = async (id) => {
    try {
      await BlogCategoriesService.deleteCategory(id);
      toaster.success(`Kategorin togs bort.`);
    } catch (error) {
      console.log("Error saving category", error);
    }

    const newList = categoryList.filter((el) => el.id !== id);
    setCategoryList([...newList]);
  };

  return {
    categoryList,
    onChangeNewCategory,
    value,
    onAddCategory,
    onDeleteCategory,
    checked
  };
};

export const BlogCategoriesPage = () => {
  const {
    categoryList,
    onChangeNewCategory,
    value,
    onAddCategory,
    onDeleteCategory,
/*     onCheck, */
    checked
  } = useEditCategoryList();

  if (!categoryList) {
    return <Spinner />;
  }

  return (
    <Pane width={600}>
      <Heading>Bloggkategorier</Heading>

      <Table>
        <Table.Body>
          {categoryList.map((el) => (
            <Table.Row key={el.id}>
              <Table.TextCell>
                <Checkbox
                ></Checkbox>
              </Table.TextCell>
              <Table.TextCell>{el.translations.sv}</Table.TextCell>
              <Table.TextCell>
                <Button
                  intent="danger"
                  appearance="primary"
                  onClick={() => onDeleteCategory(el.id)}
                >
                  Ta bort
                </Button>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pane>
        <Pane flex={1} marginRight={8}>
          <TextInput
            width="100%"
            placeholder="Lägg till kategori"
            value={value}
            onChange={(e) => onChangeNewCategory(e.target.value)}
          />
        </Pane>

        <Pane padding={20}>
          <Button
            intent="success"
            appearance="primary"
            onClick={onAddCategory}
            disabled={value.length === 0}
          >
            Spara
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};

/* TODO: promoted functionality. Switching betw languages. */
