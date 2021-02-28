import React from "react";

import { Pane, Menu, Heading } from "evergreen-ui";
import theme from "../../theme";

import { useChildMonths } from "../../hooks/useChildMonths";

export const MonthList = () => {
  const { months, selectMonth } = useChildMonths();

  return (
    <Pane
      width={320}
      height="100vh"
      overflowY="auto"
      backgroundColor={theme.colors.grey2}
      padding={20}
    >
      <Heading>Barn</Heading>
      <Pane>
        {months.length > 0 && (
          <Menu>
            {months.map(month => {
              return (
                <Menu.Item key={month.month} onSelect={() => selectMonth(month.id)}>
                  Månad {month.month}
                </Menu.Item>
              );
            })}
          </Menu>
        )}
      </Pane>
    </Pane>
  );
};
