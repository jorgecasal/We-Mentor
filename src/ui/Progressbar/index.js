import React from "react";
import styled from "styled-components";

const Progress = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 1px;
  box-sizing: border-box;
  margin: 20px 0;
`;

const Bar = styled.div`
  background-color: #328a5f;
  width: ${props => props.progress}%;
  font-size: 10px;
  box-sizing: border-box;
  text-align: center;
  color: white;
  padding: 3px 0;
  overflow: hidden;
`;

export const Progressbar = ({ progress }) => (
  <Progress>
    <Bar progress={progress}>{progress}%</Bar>
  </Progress>
);
