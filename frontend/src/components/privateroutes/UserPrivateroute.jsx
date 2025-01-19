import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const Privateroute = () => {
    const isLogedIn = !!useSelector(((state) => state.auth.token))
  return (
    <>
    {isLogedIn ? <Outlet />: <Navigate to="/login"/>}
    </>
  )
}

export default Privateroute
