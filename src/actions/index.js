import {LOAD_REPOS,LOAD_STARGEZAR} from './type'

export const loadRepos = (data)=>({
    type: LOAD_REPOS,
    payload: data
})

export const loadStargazer = (data)=>({
    type: LOAD_STARGEZAR,
    payload: data
})