/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Pane, Menu, Heading } from "evergreen-ui";
import styled from "styled-components";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";

import { Route, useHistory } from "react-router-dom";

import { SidebarComponent } from "../../components/Sidebar";
import theme from "../../theme";

import { AddCategoryPage } from "./AddCategoryPage";
import { EditContentPage } from "./EditPage";
import { useChecklistCategories } from "../../hooks/useChecklistCategories";

export const ChecklistPage = () => {
  const history = useHistory();

  const { categories, updateSortOrder } = useChecklistCategories();

  return (
    <Pane display="flex">
      <SidebarComponent />
      <Pane width={250} padding={20} backgroundColor={theme.colors.grey2}>
        <Heading>Att göra</Heading>
        <SortableList
          useDragHandle
          onSortEnd={updateSortOrder}
          categories={categories}
          selectCategory={content =>
            history.push(`/checklist/edit/${content.id}`)
          }
        />
        <Menu>
          <Menu.Divider />
          <Menu.Item icon="add" onSelect={() => history.push("/checklist/add")}>
            Lägg till ny kategori
          </Menu.Item>
        </Menu>
      </Pane>

      <Route path="/checklist/add" component={AddCategoryPage} />

      <Route path="/checklist/edit/:contentId" component={EditContentPage} />
    </Pane>
  );
};

const StyledDragHandle = styled.span`
  position: absolute;
  left: 10px;
`;

const DragHandle = sortableHandle(() => (
  <StyledDragHandle>::</StyledDragHandle>
));

const SortableItem = sortableElement(({ category, selectCategory }) => (
  <Menu.Item
    key={category.id}
    height="auto"
    padding={10}
    position="relative"
    onSelect={() => selectCategory(category)}
  >
    {category.name}
    <DragHandle />
  </Menu.Item>
));

const SortableList = sortableContainer(({ categories, selectCategory }) => {
  return (
    <Menu>
      {categories.map((category, index) => (
        <SortableItem
          key={`item-${category.id}`}
          index={index}
          category={category}
          selectCategory={selectCategory}
        />
      ))}
      <Menu.Item></Menu.Item>
    </Menu>
  );
});
