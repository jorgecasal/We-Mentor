import React from "react";
import { Pane, Menu, Heading } from "evergreen-ui";

import theme from "../../theme";

import { useQuestionList } from "../../hooks/useQuestionList";
import { useHistory } from "react-router";

export const QuestionsList = () => {
  const { questionList } = useQuestionList();

  const history = useHistory();

  return (
    <Pane
      width={250}
      height="100vh"
      backgroundColor={theme.colors.grey2}
      padding={20}
    >
      <Heading>Vanliga frågor</Heading>

      <Pane>
        {questionList.length > 0 && (
          <Menu>
            {questionList.map(doc => (
              <Menu.Item
                key={doc.id}
                whiteSpace="nowrap"
                overflow="hidden"
                onSelect={() => {
                  history.push(`/questions/${doc.id}`);
                }}
              >
                {doc.question || doc.id}
              </Menu.Item>
            ))}
            <Menu.Divider />
          </Menu>
        )}
        <Menu.Item
              whiteSpace="nowrap"
              overflow="hidden"
              icon="add"
              onSelect={() => history.push("/questions/add")}
            >
              Lägg till ny fråga
            </Menu.Item>
      </Pane>
    </Pane>
  );
};
