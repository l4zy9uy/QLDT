export async function getCurrentUser() {
    try {
        console.log('getCurrentUser()');
        return false;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function signIn() {
    try {
        console.log('signIn()');
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createUser(email, password, username) {
    try {
        console.log('createUser()');
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}