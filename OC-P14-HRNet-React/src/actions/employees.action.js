export const NEW_EMPLOYEE = 'NEW_EMPLOYEE'
/**
 *
 * @param {object} employee - Données du formulaire
 * @returns
 */
export const addNewEmployee = (employee) => {
  return (dispatch) => {
    dispatch({ type: NEW_EMPLOYEE, payload: employee })
  }
}
