const redux = require('redux');
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducer = redux.combineReducers


// REDUX ACTION
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICE_ORDERD = 'ICE_ORDERD'
const ICE_RESTOCKED = 'ICE_RESTOCKED'


function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        quantity: qty
    }
}

function orderIcream(qty = 1) {
    return {
        type: ICE_ORDERD,
        payload: qty
    }
}

function restockIce(qty = 1) {
    return {
        type: ICE_RESTOCKED,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceState = {
    numberOfIce: 20
}


//reducer 

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.quantity,
            }
        default:
            return state
    }
}

const iceReducer = (state = initialIceState, action) => {
    switch (action.type) {
        case ICE_ORDERD:
            return {
                ...state,
                numberOfIce: state.numberOfIce - 1,
            }
        case ICE_RESTOCKED:
            return {
                ...state,
                numberOfIce: state.numberOfIce + action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combineReducer({
    cake : cakeReducer,
    iceCream : iceReducer
})

const store = createStore(rootReducer)

console.log(' initial state', store.getState())

const unsubscribe = store.subscribe(() => console.log(' updated state', store.getState()))

// store.dispatch( orderCake())
// store.dispatch( orderCake())
// store.dispatch( orderCake())
// store.dispatch( orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({ orderCake, restockCake, orderIcream, restockIce },
    store.dispatch)

actions.orderCake()
actions.orderIcream()
actions.orderCake()
actions.orderIcream()
actions.orderCake()
actions.restockCake(3)
actions.restockIce(2)

unsubscribe()