const INITIAL_STATE = {
    users: [],
    loggedInUser: null
}


export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: JSON.parse(JSON.stringify(action.user))
            }
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }

        case 'UPDATE_USER':
            return {
                ...state,
                users: [...state.users.map(user => user._id === action.user._id ? action.user : user)],
            }
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
        default:
            return state;
    }
}