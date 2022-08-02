import { httpService } from './httpService.js'
import { toast } from "react-toastify";

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    query,
    remove,
    login,
    signup,
    update,
    add,
    getEmptyUser,
    makeId,
    updateLoggedinUser
}

function getEmptyUser() {
    return {
        username: '',
        fullname: '',
        email: '',
        password: '',
        isAdmin: false,
        friendList: [],
        img: '',
    }
}

async function getLoggedinUser() {
    let user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    if (!user) {
        const gUser = {
            email: "guest@gmail.com",
            password: "guest123"
        }
        await login(gUser)
        user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    }
    return user
}
function updateLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
}

async function query() {
    try {
        const users = await httpService.get(`user`)
        return users
    } catch (err) {
        console.log('Cannot get users in user-service:', err);
    }
}

async function update(user) {
    try {
        const newUser = await httpService.put(`user/${user._id}`, user)
        return newUser
    } catch (err) {
        console.log('Cannot update user in user-service:', err);
        
    }
}

async function add(user) {
    try {
        console.log('dd');
        const newUser = await httpService.post(`user/`, user)
        return newUser
    } catch (err) {
        console.log('Cannot add user in user-service:', err);
        toast.error("Cannot add user");

    }
}

async function remove(userId) {
    try {
        await httpService.delete(`user/${userId}`)
    } catch (err) {
        console.log('Cannot remove user in user-service:', err);
        toast.error("Cannot remove user");

    }
}

async function login(user) {
    try {
        const loggedUser = await httpService.post('auth/login', user)
        if (loggedUser) {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser));
            // if (loggedUser.email === 'guest@gmail.com') {
            //     // toast.success("Logged out succesfully");
            // } else toast.success("Logged in succesfully");
            return loggedUser
        }
    } catch (err) {
        console.log('Cannot login:', err);
        toast.error("Email or pasword are incorrect");
        throw "Email or pasword are incorrect"; 
    }
}

async function signup(user) {
    try {
        const loggedUser = await httpService.post('auth/signup', user)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser))
        toast.success("Signed up succesfully");
        return loggedUser
    } catch (err) {
        toast.error("Cannot signup, email already exists");
        console.log('Cannot signup:', err);
        throw err
    }
}

export function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}