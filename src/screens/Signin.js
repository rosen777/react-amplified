import React, { useState, useEffect, useContext } from "react";
import { signIn } from "../utils/signin";
import { StepContext } from "../utils/stepContext";

const initialState = {
  username: "",
  password: "",
};

const Signin = ({ onStep }) => {
  const [formState, setFormState] = useState(initialState);
  const step = useContext(StepContext);

  const setInput = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  const signinUser = () => {
    const { username, password } = formState;
    console.log("step: ", step);
    if (username && password) {
      onStep(3);
      signIn(username, password);
    }
  };
  
  return (
    <div className={styles.container}>
      <h2 style={{ marginLeft: 20 }}>Signup</h2>
      <div>
        <input
          onChange={(event) => setInput("username", event.target.value)}
          style={styles.input}
          value={formState.username}
          placeholder="Username"
          name="Username"
        />
      </div>
      <div>
        <input
          onChange={(event) => setInput("password", event.target.value)}
          style={styles.input}
          value={formState.password}
          placeholder="Password"
          name="Password"
        />
      </div>
      <div>
        <button style={{ marginLeft: 20 }} onClick={signinUser} type="button">
          Signin
        </button>
      </div>
    </div>
  );
};

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
    marginLeft: 20,
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

export default Signin;
