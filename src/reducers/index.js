import {combineReducers} from 'redux'
import reposReducer from './ReposReducer'
import stargazerReducer from './StargazerReducer'
 // combine cac reducers thanh 1 reducer duy nhat de dua vao store
export default rootReducer = combineReducers({
    reposReducer: reposReducer,
    stargazerReducer: stargazerReducer
})