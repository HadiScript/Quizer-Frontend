import React from 'react'
import Logo from '../../layouts/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {


  const navigate = useNavigate();

  const handleJump = (path) => {
    navigate(path);
  };


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
            <Link to={'/how-it-works/#'} className='_link nav-link'>How it works?</Link>
            <span role='button' onClick={() => handleJump('/#Features')} className='_link nav-link'>Features</span>
            <span role='button' onClick={() => handleJump('#Pricing')} className='_link nav-link'>Pricing</span>
            <span role='button' onClick={() => handleJump('/how-it-works/#Showcase')} className='_link nav-link'>Showcase</span>
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
            <a className='text-white _link' href="mailto:info@hadielearning.com">Info@hadielearning.com</a>
            <a className='text-white _link' href="tel:03-1111-93339">03-1111-93339</a>
            <span className='text-white'>Hadi E-Learning, Civic Center, Faisal Town Lahore.</span>
            <div className='d-flex flex-wrap gap-2'>
              <a className='_link text-white' href="https://www.facebook.com/Hadielearningofficial " target="_">  <FaFacebook size={18} role='button' /> </a>
              <a className='_link text-white' href="https://instagram.com/hadielearningofficial" target="_">  <FaInstagram size={18} role='button' /></a>
              <a className='_link text-white' >  <FaTwitter size={18} role='button' /> </a>
              <a className='_link text-white' href="">    <FaLinkedin size={18} role='button' /> </a>
              <a className='_link text-white' href=''> <FaYoutube size={18} role='button' /> </a>
            </div>

          </div>

        </div>
        <div className='d-flex justify-content-center text-white py-4 _link'>
          Copyright © <Link href={"/auth/login"} className='_link text-white'>Hadi eLearning</Link> | Developed by{" "}
          <a className='_link mx-2 text-white' href="https://cycarts.com" target="#">{" "}
            Cycarts
          </a>
        </div>
      </div>
    </div >
  )
}

export default Footer