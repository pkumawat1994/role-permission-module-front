import { combineReducers } from 'redux'
import RoleSlice from './roleSlice/RoleSlice/RoleSlice'

export const rootReducer = combineReducers({
    Role: RoleSlice
})