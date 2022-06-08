import { Auth } from "aws-amplify";

export const signIn = async ({ username, password }) => {
  try {
    const user = Auth.signIn(username, password);
  } catch (e) {
      console.log('error signing in', e);
  }
};