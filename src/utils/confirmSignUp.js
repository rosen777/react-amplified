import { Auth } from 'aws-amplify';

export const confirmSignUp = async (username, authenticationCode) => {
  try {
    Auth.confirmSignUp(username, authenticationCode);
  } catch (e) {
    console.log("error confirming sign up", e);
  }
};