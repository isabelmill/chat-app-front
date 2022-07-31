import { httpService } from './httpService.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    query,
    remove,
    login,
    signup
    update,
    add
}

const users = [{
    userName: 'Guest-User',
    fullname: 'Guest-User',
    email: 'guest@gmail.com',
    password: '',
    friendList: [],
    img: '',
}]

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
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
        const newUser = await httpService.post(`user/`, user)
        return newUser
    } catch (err) {
        console.log('Cannot add user in user-service:', err);
    }
}

async function remove(userId) {
    try {
         await httpService.delete(`user/${userId}`)
    } catch (err) {
        console.log('Cannot remove user in user-service:', err);
    }
}

async function login(user) {
    try {
        const loggedUser = await httpService.post('auth/login', user)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser));
        return loggedUser
    } catch (err) {
        console.log('Cannot login:', err);
    }
}

async function signup(user) {
    try {
        const loggedUser = await httpService.post('auth/signup', user)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedUser))
    } catch (err) {
        console.log('Cannot signup:', err);
    }
}