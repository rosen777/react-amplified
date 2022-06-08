import React, {useEffect, useState} from 'react';
import { Authenticator, Amplify, API, graphqlOperation } from "aws-amplify";
import {createTodo} from './graphql/mutations';
import {listTodos} from './graphql/queries';
import { useAuthenticator, withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { StepContext } from "./utils/stepContext";
import Signup from './screens/Signup'
import SignIn from './screens/Signin';
import ToDo from './screens/ToDo';


const App = ({}) => {
  const [todos, setTodos] = useState([]);
  const [step, setStep] = useState(0);

  console.log(useAuthenticator);
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos)
    } catch (err) {
      console.log('error fetching todos')
    }
  }

  return (
    <Authenticator socialProviders={["amazon", "apple", "facebook", "google"]}>
      {({ signOut, user }) => (
      <StepContext.Provider value={step}>
        <ToDo />
        <>
          <div>
            <div style={styles.todoName}>
             User: {user.userName}
            </div>
          </div>
          <div style={{ marginTop: 20, marginLeft: 20 }}>
            <Button onClick={signOut}>Sign out</Button>
          </div>
        </>
      </StepContext.Provider>
      )};
    </Authenticator>
  );
  }


const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default withAuthenticator(App);
