import { Auth } from 'aws-amplify';

export const signUp = async (username, password, email, phone_number) => {
    try {
        const {user} = await Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number,
            }
        })
    } catch(e) {
        console.log('error signing up:', e)
    }
}
