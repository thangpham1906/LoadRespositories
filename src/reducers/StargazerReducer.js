import {LOAD_STARGEZAR} from '../actions/type'

export default function (state = [], action){
    switch(action.type){
        case LOAD_STARGEZAR:{
            return action.payload
        }
        default:
            return state
    }
}