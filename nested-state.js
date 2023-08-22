const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name : 'william',
    address : {
        street: '123 main st',
        city: 'boston',
        state : 'ma'
    }
}

const STREET_UPDATED = 'STREET UPDATED'

const updateStreet = (street)=>{
    return{
        type : STREET_UPDATED,
        payload : street
    }
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street: action.payload
            //     }
            // }

            return produce (state, (draft)=>{
                draft.address.street = action.payload
            })
        default:{
            return state
        }
    }
}

const store = redux.createStore(reducer)

console.log ('Initial state ', store.getState())

const unsubscribe = store.subscribe (()=>{
    console.log('updated State ', store.getState())
})

store.dispatch(updateStreet(' 456 main st'))
unsubscribe()