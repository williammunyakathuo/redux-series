const redux = require("redux")
const thunkMiddleware = require("redux-thunk").default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware


const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCCES = 'FETCH_USERS_SUCCCES'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUserRequested = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUserSucces = (users) => {
    return {
        type: FETCH_USERS_SUCCCES,
        payload: users
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCCES:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequested)
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const users = response.data.map((user) => user.name)
                dispatch(fetchUserSucces(users))
            }).catch((error) => {
                dispatch(fetchUserFailure(error.message))
            })

    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))


store.subscribe(() =>{
    console.log(store.getState())
})

store.dispatch(fetchUsers())