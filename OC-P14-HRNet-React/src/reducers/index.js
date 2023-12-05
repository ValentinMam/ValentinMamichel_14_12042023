/* eslint-disable comma-dangle */
import { combineReducers } from 'redux'
import EmployeeReducer from './employee.reducer.js'

/** Création du reducer */
export default combineReducers({
  employees: EmployeeReducer,
})
