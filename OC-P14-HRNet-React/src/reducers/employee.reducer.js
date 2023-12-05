/* eslint-disable comma-dangle */
import { NEW_EMPLOYEE } from '../actions/employees.action'

/**
 * Initialisation du state
 */
const initialState = {
  employees: [],
}

export default function EmployeeReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_EMPLOYEE:
      /** Mise à jour du state */
      return {
        ...state,
        employees: [...state.employees, action.payload],
      }
    default:
      return state
  }
}
