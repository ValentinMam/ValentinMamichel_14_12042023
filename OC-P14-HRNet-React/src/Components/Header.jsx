/* eslint-disable react/prop-types */
import './Header.css'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'

/**
 * Header
 * @returns {component}
 */
function Header() {
  return (
    <header>
      <div className="navBar">
        <Link to="/">
          <img src={logo} alt="logo HRNet" width={'150px'} height={'138px'} />
        </Link>
        <h1>HRNET</h1>
      </div>
    </header>
  )
}

export default Header
