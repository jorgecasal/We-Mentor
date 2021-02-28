import React, { useEffect, useState } from "react";
import {
  Button,
  Pane,
  Menu,
  TextInput,
  TextInputField,
  TextareaField,
  Spinner,
  Label,
  toaster
} from "evergreen-ui";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import arrayMove from "array-move";

import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";

import ChecklistService from "../../services/ChecklistService";
import { createFirestoreId } from "../../utils/firebase";

import { ContextMenu } from "../../components/ContextMenu";
import { useSelectedLanguage } from "../../context/language";

const initialChecklist = {
  name: "",
  intro: "",
  tasks: [],
  sortOrder: 0
};

const useEditCheckist = () => {
  const history = useHistory();
  const { contentId } = useParams();
  const { selectedLanguage } = useSelectedLanguage();

  const [checklist, setChecklist] = useState(initialChecklist);
  const [documentRef, setDocumentRef] = useState(null);

  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (selectedLanguage && contentId) {
      ChecklistService.getContent(selectedLanguage, contentId)
        .then(doc => {
          setDocumentRef(doc.ref);
          const data = doc.data();
          setChecklist({ id: doc.ref.id, ...initialChecklist, ...data });
        })
        .catch(err => {
          console.log("Unable to load checklist content", err);
        });
    }
  }, [selectedLanguage, contentId]);

  const onDeleteChecklist = async () => {
    console.log(selectedLanguage);
    console.log(checklist);

    try {
      await ChecklistService.deleteChecklist(selectedLanguage, checklist.id);
      history.push(`/checklist/edit`);
      toaster.success(`Kategorin uppdaterades.`);
    } catch (error) {
      console.log("Error saving category", error);
    }
  };

  const onChangeChecklistItem = (id, value) => {
    console.log("onChangeChecklistItem");

    const index = checklist.tasks.findIndex(item => item.id === id);
    if (index >= 0) {
      const clonedTasks = [...checklist.tasks];
      clonedTasks[index].text = value;
      setChecklist({ ...checklist, tasks: clonedTasks });
    }
  };

  const onUpdateSortOrder = async ({ oldIndex, newIndex, collection }) => {
    const updatedItems = arrayMove(checklist.tasks, oldIndex, newIndex);
    for (let i = 0; i < updatedItems.length; i++) {
      updatedItems[i].sortOrder = i;
    }
    setChecklist({ ...checklist, tasks: updatedItems });
  };

  const onAddChecklistItem = () => {
    let highestSortOrder = 0;
    for (let i = 0; i < checklist.tasks.length; i++) {
      if (checklist.tasks[i].sortOrder > highestSortOrder) {
        highestSortOrder = checklist.tasks[i].sortOrder;
      }
    }

    const item = {
      id: createFirestoreId(),
      text: newItem,
      checked: false,
      sortOrder: highestSortOrder + 1
    };

    setChecklist({ ...checklist, tasks: [...checklist.tasks, item] });
    setNewItem("");
  };

  const onDeleteChecklistItem = id => {
    const index = checklist.tasks.findIndex(item => item.id === id);
    if (index >= 0) {
      const clonedTasks = [...checklist.tasks];
      clonedTasks.splice(index, 1);
      setChecklist({ ...checklist, tasks: clonedTasks });
    }
  };

  const onChange = (name, value) => {
    const clonedChecklist = { ...checklist };
    clonedChecklist[name] = value;
    setChecklist(clonedChecklist);
  };

  const onSave = async () => {
    const data = {
      id: documentRef.id,
      ...checklist,
      tasks: checklist.tasks.map((task, index) => ({
        ...task,
        sortOrder: index
      }))
    };

    try {
      await ChecklistService.updateCategory(selectedLanguage, data);
      toaster.success(`Kategorin uppdaterades.`);
    } catch (error) {
      console.log("Error saving category", error);
    }
  };

  return {
    checklist,
    newItem,
    setNewItem,
    onAddChecklistItem,
    onUpdateSortOrder,
    onChangeChecklistItem,
    onDeleteChecklistItem,
    onChange,
    onSave,
    documentRef,
    onDeleteChecklist
  };
};

export const EditContentPage = () => {
  const {
    checklist,
    newItem,
    setNewItem,
    onAddChecklistItem,
    onUpdateSortOrder,
    onChangeChecklistItem,
    onDeleteChecklistItem,
    onChange,
    onSave,
    onDeleteChecklist
  } = useEditCheckist();

  if (!checklist) {
    return <Spinner />;
  }

  return (
    <Pane width={600}>
      <ContextMenu
        title={checklist.name}
        menu={
          <Menu>
            <Menu.Group>
              <Menu.Item
                icon="trash"
                intent="danger"
                onSelect={onDeleteChecklist}
              >
                Ta bort
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      />

      <Pane>
        <Pane padding={20} paddingBottom={0}>
          <TextInputField
            label="Namn"
            value={checklist.name}
            onChange={e => onChange("name", e.target.value)}
          />
          <TextareaField
            label="Intro"
            value={checklist.intro}
            onChange={e => onChange("intro", e.target.value)}
          />
        </Pane>

        <Pane paddingLeft={20} paddingRight={20}>
          <Label>Checklista</Label>
        </Pane>

        <SortableList
          useDragHandle
          onSortEnd={onUpdateSortOrder}
          items={checklist.tasks}
          newItem={newItem}
          onAddChecklistItem={onAddChecklistItem}
          onChangeNewItem={setNewItem}
          onChangeChecklistItem={onChangeChecklistItem}
          onDeleteChecklistItem={onDeleteChecklistItem}
        />

        <Pane padding={20}>
          <Button intent="success" appearance="primary" onClick={onSave}>
            Spara
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};

const StyledDragHandle = styled.div`
  padding-left: 6px;
  padding-right: 12px;
  text-align: center;
`;

const DragHandle = sortableHandle(() => (
  <StyledDragHandle>::</StyledDragHandle>
));

const ChecklistItem = sortableElement(
  ({ item, onChangeChecklistItem, onDeleteChecklistItem }) => (
    <Pane
      key={item.id}
      display="flex"
      alignItems="center"
      marginBottom={16}
      width="100%"
    >
      <DragHandle />
      <Pane flex="1" marginRight={8}>
        <TextInput
          width="100%"
          value={item.text}
          onChange={e => onChangeChecklistItem(item.id, e.target.value)}
        />
      </Pane>
      <Pane>
        <Button
          intent="danger"
          appearance="primary"
          onClick={() => onDeleteChecklistItem(item.id)}
        >
          Ta bort
        </Button>
      </Pane>
    </Pane>
  )
);

const orderBySortOrder = (a, b) => a.sortOrder - b.sortOrder;

const SortableList = sortableContainer(
  ({
    items,
    newItem,
    onAddChecklistItem,
    onChangeNewItem,
    onChangeChecklistItem,
    onDeleteChecklistItem
  }) => {
    return (
      <Pane padding={20}>
        {items.sort(orderBySortOrder).map((item, index) => (
          <ChecklistItem
            key={`checklistItem-${item.id}`}
            index={index}
            item={item}
            onChangeChecklistItem={onChangeChecklistItem}
            onDeleteChecklistItem={onDeleteChecklistItem}
          />
        ))}
        <Pane display="flex" width="100%">
          <Pane flex={1} marginRight={8}>
            <TextInput
              width="100%"
              placeholder="Ny punkt"
              value={newItem}
              onChange={e => onChangeNewItem(e.target.value)}
            />
          </Pane>
          <Pane>
            <Button
              intent="success"
              appearance="primary"
              onClick={onAddChecklistItem}
              disabled={newItem.length === 0}
            >
              + Lägg till
            </Button>
          </Pane>
        </Pane>
      </Pane>
    );
  }
);
