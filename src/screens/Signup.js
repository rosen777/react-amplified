import React, {useState, useEffect, useContext} from 'react'
import { Auth } from 'aws-amplify';
import { signUp } from '../utils/signUp';
import { confirmSignUp } from '../utils/confirmSignUp';
import { StepContext } from '../utils/stepContext';
import {resendCode} from '../utils/resendCode';


const initialState = {
    username: '',
    password: '',
    email: '',
    phone_number: ''
}

const Signup = ({onStep}) => {
    const [formState, setFormState] = useState(initialState);
    const [username, setUsername] = useState('');
    const [authenticationCode, setAuthenticationCode] = useState('');
    const step = useContext(StepContext);

    const setInput = (key, value) => {
        setFormState({
            ...formState,
            [key]: value,
        })
    }

    const signup = () => {
      const {username, password, email, phone_number} = formState;
      console.log('step: ', step);
      if (username && password && email && phone_number) {
        onStep(1);
        signUp(username, password, email, phone_number);
      }
    }

    const confirmSignup = () => {
       console.log("step: ", step);
      if (username && authenticationCode) {
        onStep(3);
        confirmSignUp(username, authenticationCode);
      }
    }

    const resentAuthCode = () => {
      if (username) {
        resendCode(username);
      }
    }

    return (
      <>
        {step === 0 && (
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
              <input
                onChange={(event) => setInput("email", event.target.value)}
                style={styles.input}
                value={formState.email}
                placeholder="Email"
                name="Email"
              />
            </div>
            <div>
              <input
                onChange={(event) =>
                  setInput("phone_number", event.target.value)
                }
                style={styles.input}
                value={formState.phone_number}
                placeholder="Phone Number"
                name="Phone Number"
              />
              <div>
                <button
                  style={{ marginLeft: 20 }}
                  onClick={signup}
                  type="button"
                >
                  Signup
                </button>
                <div>or</div>
                <button
                  style={{ marginLeft: 20 }}
                  onClick={onStep(2)}
                  type="button"
                >
                  Signin
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="container">
            <h2>Confirm Signup</h2>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Username"
              style={styles.input}
              value={username}
            />
            <input
              onChange={(event) => {
                setAuthenticationCode(event.target.value);
              }}
              placeholder="Authentication Code"
              style={styles.input}
              value={authenticationCode}
            />
            <div>
              <button
                style={{ marginLeft: 20 }}
                onClick={confirmSignup}
                type="button"
              >
                Confirm Signup
              </button>
              OR
              <button
                onClick={resentAuthCode}
                placeholder="Confirmation Code"
                style={styles.input}
                type="button"
              >
                Resend Code
              </button>
            </div>
          </div>
        )}
      </>
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


export default Signup