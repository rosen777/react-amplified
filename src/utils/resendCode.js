import { Auth } from "aws-amplify";

export const resendCode = async ({ username }) => {
    try {
        await Auth.resendSignUp(username)
    } catch (e) {
        console.log('error resending code: ', e)
    }
}
