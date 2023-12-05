/* eslint-disable comma-dangle */
import React, { useState } from 'react'
import { Link as routerLink } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Typography,
  Container,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  Link,
} from '@mui/material'
import statesList from '../datas/states.json'
import dptList from '../datas/departments.json'
import { addNewEmployee } from '../actions/employees.action.js'
import { store } from '../App'

// import Modal from '../Components/Modale'
import Modal from 'mam_modale'

/**
 * Stete initial des données d'un employé
 * @returns {object}
 */
function CreateEmployee() {
  const formDataInitialState = {
    firstName: {
      value: '',
      error: false,
    },
    lastName: {
      value: '',
      error: false,
    },
    dateOfBirth: {
      value: '',
      error: false,
    },
    startDate: {
      value: '',
      error: false,
    },
    street: {
      value: '',
      error: false,
    },
    city: {
      value: '',
      error: false,
    },
    stateCode: {
      value: '',
      error: false,
    },
    zipCode: {
      value: '',
      error: false,
    },
    department: {
      value: '',
      error: false,
    },
  }

  /** initialisation du state et du formulaire */
  const [formData, setFormData] = useState(formDataInitialState)

  /**
   * Mise à jour du state à chaque changement
   * @param {event} e
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: {
        value: e.target.value,
        error: false,
      },
    })
  }

  const [isOpen, setIsOpen] = useState(false)

  /**
   * Soumission du formulaire
   * Contrôle de la présence de tous les champs requis
   * @param {event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    let formOK = true
    for (const item in formData) {
      if (!formData[item].value) {
        setFormData({
          ...formData,
          [item]: {
            value: '',
            error: true,
          },
        })
        formOK = false
      }
    }
    if (formOK) {
      const newEmployee = {}
      const employee = store.getState()
      const id = employee.employees.employees.length + 1
      newEmployee.id = id
      for (const item in formData) {
        newEmployee[item] = formData[item].value
      }
      /** Mise à jour du State REDUX si le formulaire est complet */
      store.dispatch(addNewEmployee(newEmployee))
      /** Réinitialisation du formulaire */
      setFormData(formDataInitialState)
      /** Affichage de la modale */
      setIsOpen(true)
    }
  }

  return (
    <>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          text="Employee successfully added."
          buttonColor="#1976d2"
          textColor="#1976d2"
          textSize="1.5em"
          modalWidth="30%"
          modalHeight="200px"
        />
      )}
      <Container>
        <Typography variant="h4" component="h1">
          Create Employee
        </Typography>

        <Link to="/employeeslist" component={routerLink}>
          View Current Employees
        </Link>
        <br />
        <FormControl
          fullWidth
          style={{ translate: '50%', width: '50%', margin: 'auto' }}
        >
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            id="createForm"
            name="createForm"
          >
            <TextField
              size="small"
              fullWidth
              id="firstName"
              name="firstName"
              value={formData.firstName.value}
              onChange={handleChange}
              style={{ marginTop: '20px' }}
              type="text"
              variant="outlined"
              label="First Name"
              required
              error={formData.firstName.error}
              helperText={formData.firstName.error ? 'Invalid Entry' : null}
            ></TextField>
            <br />
            <TextField
              size="small"
              fullWidth
              id="lastName"
              name="lastName"
              value={formData.lastName.value}
              onChange={handleChange}
              style={{ marginTop: '20px' }}
              type="text"
              variant="outlined"
              label="Last Name"
              required
              error={formData.lastName.error}
              helperText={formData.lastName.error ? 'Invalid Entry' : null}
            ></TextField>
            <br />
            <TextField
              size="small"
              fullWidth
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth.value}
              type="date"
              style={{ marginTop: '20px' }}
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={formData.dateOfBirth.error}
              helperText={formData.dateOfBirth.error ? 'Invalid Entry' : null}
              required
            ></TextField>
            <br />
            <TextField
              size="small"
              fullWidth
              id="startDate"
              name="startDate"
              value={formData.startDate.value}
              type="date"
              style={{ marginTop: '20px' }}
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={formData.startDate.error}
              helperText={formData.startDate.error ? 'Invalid Entry' : null}
              required
            ></TextField>
            <br />
            <FormControl
              fullWidth
              style={{
                border: '1px solid gray',
                borderRadius: '5px',
                marginTop: '20px',
                padding: '0 10px',
                paddingBottom: '10px',
                marginBottom: '20px',
              }}
            >
              <FormLabel>Address</FormLabel>
              <TextField
                size="small"
                fullWidth
                id="street"
                name="street"
                value={formData.street.value}
                type="text"
                style={{ marginTop: '20px' }}
                label="Street"
                required
                onChange={handleChange}
                error={formData.street.error}
                helperText={formData.street.error ? 'Invalid Entry' : null}
              ></TextField>
              {/* <br /> */}
              <TextField
                size="small"
                fullWidth
                id="city"
                name="city"
                value={formData.city.value}
                type="text"
                style={{ marginTop: '20px' }}
                label="City"
                required
                onChange={handleChange}
                error={formData.city.error}
                helperText={formData.city.error ? 'Invalid Entry' : null}
              ></TextField>
              <br />
              <FormControl required fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  // size="small"
                  id="stateCode"
                  name="stateCode"
                  value={formData.stateCode.value}
                  label="State"
                  onChange={handleChange}
                  error={formData.stateCode.error}
                >
                  {statesList.states.map((item) => (
                    <MenuItem key={item.abbreviation} value={item.abbreviation}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formData.stateCode.error ? 'Invalid Entry' : null}
                </FormHelperText>
              </FormControl>
              <TextField
                size="small"
                fullWidth
                id="zipCode"
                name="zipCode"
                value={formData.zipCode.value}
                type="number"
                style={{ marginTop: '20px' }}
                label="Zip Code"
                required
                onChange={handleChange}
                error={formData.zipCode.error}
                helperText={formData.zipCode.error ? 'Invalid Entry' : null}
              ></TextField>
            </FormControl>
            <FormControl required fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                id="department"
                name="department"
                value={formData.department.value}
                label="Department"
                onChange={handleChange}
                error={formData.department.error}
              >
                {dptList.departments.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formData.department.error ? 'Invalid Entry' : null}
              </FormHelperText>
            </FormControl>
            <br />
            <Button
              id="submitButton"
              type="submit"
              variant="contained"
              style={{ marginTop: '20px' }}
            >
              Save
            </Button>
          </form>
        </FormControl>
      </Container>
    </>
  )
}

export default CreateEmployee
