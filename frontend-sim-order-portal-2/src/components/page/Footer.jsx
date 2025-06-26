import React from 'react'
import "../../css/Footer.css"
const Footer = () => {
  return (
    <div className='footer'>
      <img src="/Images/jio_logo.png"/>
      <p className='copyright'> 

      Copyright © {new Date().getFullYear()} Reliance Jio Infocomm Ltd., All rights reserved.
      </p>
    </div>
  )
}

export default Footer
