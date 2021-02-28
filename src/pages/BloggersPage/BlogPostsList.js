import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import { Menu, Pane, Heading, FastBackwardIcon, TickCircleIcon, BanCircleIcon } from "evergreen-ui";
import theme from "../../theme";
import { useParams } from "react-router";

export const BlogPostsList = ({ bloggerData, posts, weekNum }) => {
  const [p, setP] = useState([]);
  const history = useHistory();
  const { bloggerId } = useParams();
  useEffect(() => {
    setP(posts);
  }, [bloggerId]);

  const sideIcon = (found) => {
    if(found && found.url) return <TickCircleIcon color="success" marginRight={2} size={10}/>;
    else if(found && !found.url) return <BanCircleIcon color="danger" marginRight={2} size={10}/>;
    else if(!found) return null;
  }
  const createWeeks = () => {
    let arr = [];
    for (let i = 1; i <= 37; i++) {
      const found = posts.find(post => i === post.week);
      arr.push(
        <Menu.Item
          backgroundColor={i.toString() === weekNum ? "rgb(242, 244, 248)" : ""}
          onSelect={() => {
            history.push(`/bloggers/${bloggerId}/week/${i}`);
          }}
        >
          <p style={found ? null : { textDecoration: "line-through" }}>
            {sideIcon(found)} Vecka {i}
          </p>
        </Menu.Item>
      );
    }
    return arr;
  };

  return (
    <Pane width={250} padding={20} backgroundColor={theme.colors.grey3}>
      <Heading>{bloggerData === undefined ? "" : bloggerData}</Heading>
      <Pane>
        <Menu.Item
          key={bloggerId}
          whiteSpace="nowrap"
          overflow="hidden"
          onSelect={() => {
            history.push(`/bloggers/${bloggerId}/allmant`);
          }}
        >
          Allmänt
        </Menu.Item>
        <Menu.Divider />
        {createWeeks()}
      </Pane>
    </Pane>
  );
};
