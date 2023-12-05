import React from 'react'
import { Routes, Route } from 'react-router'
import CreateEmployee from '../Pages/CreateEmployee'
import EmployeesList from '../Pages/EmployeesList'
import Error404 from '../Pages/Error404'

function Router() {
  return (
    <Routes>
      <Route path="/" element=<CreateEmployee />></Route>
      <Route path="/employeeslist" element=<EmployeesList />></Route>
      <Route path="*" element=<Error404 />></Route>
    </Routes>
  )
}

export default Router
