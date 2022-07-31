import { userService } from "../../services/userService"

export function loadLoggedInUser() {
    return async (dispatch) => {
        try {
            let user = await userService.getLoggedinUser()
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Cannot load loggedin user:', err)
        }
    }
}

export function loadUsers() {
    return async (dispatch) => {
        try {
            const users = await userService.query()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('Cannot load users:', err)
        }
    }
}

export function updateUser(user) {
    return async (dispatch) => {
        try {
            const updatedUser = await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
        } catch (err) {
            console.log('Cannot update user:', err)
        }
    }
}

export function addUser(user) {
    return async (dispatch) => {
        try {
            const newUser = await userService.add(user)
            dispatch({ type: 'ADD_USER', user: newUser })
        } catch (err) {
            console.log('Cannot add user:', err)
        }
    }
}

export function removeUser(userId) {
    return async (dispatch) => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('Cannot remove user:', err)
        }
    }
}

export function login(user) {
    return async (dispatch) => {
        try {
            const newLoggedUser = await userService.login(user)
            dispatch({ type: 'SET_USER', newLoggedUser })
        } catch (err) {
            console.log('Cannot Login:', err)
        }

    }
}

export function signup(user) {
    return async (dispatch) => {
        try {
            let newUser = await userService.signup(user)
            newUser = await userService.login(user)
            dispatch({ type: 'ADD_USER', newUser })
            dispatch({ type: 'SET_USER', newUser })
        } catch (err) {
            console.log('Cannot Signup:', err)
        }
    }
}