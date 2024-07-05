import React from 'react'
import Logo from '../../layouts/Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div
      id="Footer"
      key="footer"
      className='pt-4'
      style={{ backgroundColor: "#083344" }}
    >
      <div className="container" >
        <div
          className='home-page-wrapper d-flex flex-wrap justify-content-between align-items-start p-4 text-white mt-5'
        >

          <Logo />
          <div className='d-flex flex-column justify-content-start align-items-start gap-3  '>
            <h6 style={{ fontSize: "20px" }}>Menus</h6>
            <Link to={'/#'} className='_link nav-link'>Home</Link>
            <a href={'#Features'} className='_link nav-link'>Features</a>
            <Link className='_link nav-link'>Pricing</Link>
            <Link className='_link nav-link'>Showcase</Link>
            <Link to={'/how-it-works/#'} className='_link nav-link'>How it works?</Link>
          </div>

          <div className='d-flex flex-column justify-content-start align-items-start gap-3 '>
            <h6 style={{ fontSize: "20px" }}>Terms</h6>
            <Link to={'/privacy-and-policy'} className='_link nav-link'>Privacy & Policy </Link>
            <Link to={'/disclaimer'} className='_link nav-link'>Disclaimer</Link>
            <Link to={'/dmca-policy'} className='_link nav-link'>DMCA</Link>
            <Link to={'/terms-and-conditions'} className='_link nav-link'>Terms And Conditions</Link>
          </div>

          <div className='d-flex flex-column justify-content-start align-items-start gap-3 '>
            <h6 style={{ fontSize: "20px" }}>Contact</h6>
            <Link className='_link nav-link'>Privacy & Policy </Link>
            <Link className='_link nav-link'>Disclaimer</Link>
            <Link className='_link nav-link'>DMCA</Link>
            <Link className='_link nav-link'>Terms And Conditions</Link>
          </div>

        </div>
        <div className='d-flex justify-content-center text-white py-4'>Copyright © Sawal.com | Developed by Cycarts</div>
      </div>
    </div>
  )
}

export default Footer