import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar () {
  return (
    <ul>
      <NavLink activeStyle={{fontWeight: 'bold'}} to="/pageOne">
        PageOne
      </NavLink>
      <NavLink activeStyle={{fontWeight: 'bold'}} to="/pageTwo">
        PageTwo
      </NavLink>
    </ul>
  )
}