const redux = require('redux');
const createStore = redux.createStore


// REDUX ACTION
const CAKE_ORDERED = 'CAKE_ORDERED'


function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

const initialState = {
    numOfCakes: 10
}


//reducer 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state
    }
}


const store = createStore(reducer)

console.log(' initial state' , store.getState())

const unsubscribe =  store.subscribe(()=> console.log(' updated state', store.getState()))

store.dispatch( orderCake())
store.dispatch( orderCake())
store.dispatch( orderCake())
store.dispatch( orderCake())

unsubscribe()