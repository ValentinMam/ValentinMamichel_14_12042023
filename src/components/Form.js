/* eslint-disable id-length */
import '../css/form.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../redux/reducer'
import { states } from '../utils/states'
import { departments } from '../utils/departments'
import Select from 'react-select'
import ErrorModal from './ErrorModal'

// import Modal from '../Components/Modale'
import Modal from 'mam_modale'

export function Form() {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [startDate, setStartDate] = useState(undefined)
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(undefined)
  const [department, setDepartment] = useState('Engineering')
  const [state, setState] = useState('AL')
  const [isOpen, setIsOpen] = useState(false)
  const onSubmiting = (e) => {
    e.preventDefault()
    submitForm()
  }
  //function to check if all conditions are required
  //before sending forms data to the redux store
  const submitForm = () => {
    //More conditions could be added if needed

    const nameRegex = /^[a-zA-Z]+$/
    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
      setErrorMessage('Error: firstName and lastName must be letters')
      setIsErrorModalOpen(true)

      return
    }

    const today = new Date()
    if (dateOfBirth.getTime() >= today.getTime()) {
      setErrorMessage('Error: dateOfBirth must be before today')
      setIsErrorModalOpen(true)

      return
    }

    if (startDate.getTime() <= dateOfBirth.getTime()) {
      setErrorMessage('Error: StartDate must be after dateOfBirth')
      setIsErrorModalOpen(true)

      return
    }

    if (!city) {
      return
    }

    if (!zipCode) {
      return
    }

    if (!street) {
      return
    }

    //Create my set of datas
    const employee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toDateString(),
      startDate: startDate.toDateString(),
      street,
      city,
      state,
      zipCode,
      department,
    }
    //if all conditions are Ok, dispatch data to the store
    dispatch(addEmployee(employee))
    setIsOpen(true)
  }

  return (
    <div className="containertmr">
      <h2>Create Employee</h2>
      <form
        onSubmit={(e) => {
          onSubmiting(e)
        }}
        className="form_container"
      >
        <div className="main_container">
          <div className="left_container">
            <section className="topForm_container">
              <label htmlFor="firstName">First Name</label>
              <input
                required
                type="text"
                value={firstName}
                onChange={(e) => {
                  return setFirstName(e.target.value)
                }}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                required
                type="text"
                value={lastName}
                onChange={(e) => {
                  return setLastName(e.target.value)
                }}
              />

              <div className="date_container">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <ReactDatePicker
                  required
                  selected={dateOfBirth}
                  onChange={(date) => {
                    return setDateOfBirth(date)
                  }}
                  placeholderText="mm/dd/yyyy"
                />
              </div>
              <div className="startDate_container">
                <label htmlFor="startdate">Start Date</label>
                <ReactDatePicker
                  required
                  selected={startDate}
                  onChange={(date) => {
                    return setStartDate(date)
                  }}
                  placeholderText="mm/dd/yyyy"
                />
              </div>
            </section>
            <section className="department_container">
              <label htmlFor="department">Department</label>

              <Select
                required
                id="form__department"
                className="select"
                options={departments}
                onChange={(departments) => {
                  return setDepartment(departments.label)
                }}
              />
            </section>
          </div>
          <div className="right_container">
            {' '}
            <fieldset className="address_container">
              <legend>Address</legend>

              <label htmlFor="street">Street</label>
              <input
                required
                id="street"
                value={street}
                onChange={(e) => {
                  return setStreet(e.target.value)
                }}
                type="text"
              />

              <label htmlFor="city">City</label>
              <input
                required
                value={city}
                onChange={(e) => {
                  return setCity(e.target.value)
                }}
                id="city"
                type="text"
              />

              <label htmlFor="state">State</label>

              <Select
                required
                id="form__state"
                className="select"
                options={states}
                onChange={(states) => {
                  return setState(states.value)
                }}
              />

              <label htmlFor="zip-code">Zip Code</label>
              <input
                required
                value={zipCode}
                onChange={(e) => {
                  return setZipCode(e.target.value)
                }}
                id="zip-code"
                type="number"
                max="999999"
              />
            </fieldset>
          </div>
        </div>
        <button id="myBtn" type="submit" className="btn">
          Envoyer
        </button>
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            buttonColor="#93ad18"
            modalWidth="30%"
            modalHeight="400px"
            text="formulaire envoyé !"
            textColor="black"
            textSize="1.5em"
            modalBG="white"
          />
        )}
      </form>
      <div>
        <ErrorModal
          isOpen={isErrorModalOpen}
          message={errorMessage}
          onClose={() => {
            return setIsErrorModalOpen(false)
          }}
        />
      </div>
    </div>
  )
}
