import React from "react";

import { Pane, Menu, Heading } from "evergreen-ui";
import theme from "../../theme";

import { usePregnancyWeeks } from "../../hooks/usePregnancyWeeks";

export const WeekList = () => {
  const { weeks, selectWeek } = usePregnancyWeeks();

  return (
    <Pane
      width={320}
      height="100vh"
      overflowY="auto"
      backgroundColor={theme.colors.grey2}
      padding={20}
    >
      <Heading>Gravid</Heading>
      <Pane>
        {weeks.length > 0 && (
          <Menu>
            {weeks.map(week => {
              return (
                <Menu.Item key={week.week} onSelect={() => selectWeek(week.id)}>
                  Vecka {week.week}
                </Menu.Item>
              );
            })}
          </Menu>
        )}
      </Pane>
    </Pane>
  );
};
