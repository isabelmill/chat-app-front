import { userService } from "../../services/userService"
import { toast } from "react-toastify";

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
    return async (dispatch, getState) => {
        try {
            const updatedUser = await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
            const { loggedInUser } = getState().userModule
            if (loggedInUser._id === updatedUser._id) {
                userService.updateLoggedinUser(updatedUser)
                dispatch({ type: 'SET_USER', user: updatedUser })
            }
        } catch (err) {
            // toast.error("Cannot update user");
            console.log('Cannot update user:', err)
        }
    }
}

export function addUser(user) {
    return async (dispatch) => {
        try {
            console.log('ddddddd');
            const newUser = await userService.add(user)
            if (newUser) {
                dispatch({ type: 'ADD_USER', user: newUser })
                toast.success("User was added succesfuly");
            }
        } catch (err) {
            console.log('Cannot add user:', err)
            toast.error("Cannot add user");
        }
    }
}

export function removeUser(userId) {
    return async (dispatch) => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
            toast.success("User was removed succesfuly");
        } catch (err) {
            console.log('Cannot remove user:', err)
            toast.error("Cannot remove user");
        }
    }
}

export function login(user) {
    return async (dispatch) => {
        try {
            const newLoggedUser = await userService.login(user)
            if (newLoggedUser) {
                dispatch({ type: 'SET_USER', user: newLoggedUser })
            }
        } catch (err) {
            console.log('Cannot Login:', err)
            throw err
        }

    }
}

export function signup(user) {
    return async (dispatch) => {
        try {
            const newUser = await userService.signup(user)
            if (newUser) {
                dispatch({ type: 'ADD_USER', user: newUser })
                dispatch({ type: 'SET_USER', user: newUser })
            }
        } catch (err) {
            console.log('Cannot Signup:', err)
            throw err
        }
    }
}