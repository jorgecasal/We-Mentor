import React, { useState } from "react";
import { TextInputField, Heading, Button } from "evergreen-ui";
import firebase from "../../firebase";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const LoginPage = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signin = async (event) => {
    setError(null);
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("redirecting");
      history.push("/dashboard");
    } catch (ex) {
      setError(ex);
    }
  };

  return (
    <Wrapper>
      <Box>
        <Heading>Logga in</Heading>
        <form onSubmit={signin}>
        <TextInputField
          label="E-Post"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <TextInputField
          label="Lösenord"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button appearance="primary" >
          Logga in
        </Button>
        </form>
        <Message>{error ? error.message : null}</Message>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Box = styled.div`
  width: 500px;
  height: 250px;
  padding: 20px;
`;

const Message = styled.p`
  color: #ff0000;
  width: 400px;
  word-wrap: wrap-word;
  margin-top: 10px;
`;
