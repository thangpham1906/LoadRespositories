// update state cua moi action
import {LOAD_REPOS} from '../actions/type'

export default function (state = [], action){
    switch(action.type){
        case LOAD_REPOS:{
            return action.payload
        }
        default:
            return state
    }
}