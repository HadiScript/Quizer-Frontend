import React from 'react'
import Logo from '../../layouts/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Grid } from 'antd';

const Footer = () => {

  const points = Grid.useBreakpoint()

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

          {/* <Logo /> */}
          <div className="d-flex flex-column ">
            <img src='/white2.png' height={80} width={200} />
            <div className="div mt-4" style={{ maxWidth: "300px" }}>
              <span>Engage, Explore, and Excel With our Supreme Quality Quiz and Survey Generator app.</span>
            </div>
          </div>
          <div className='d-flex flex-column justify-content-start align-items-start gap-3   ' style={{ marginTop: !points.md && "30px" }}>
            <h6 style={{ fontSize: "20px" }}>Menu</h6>
            <Link to={'/#'} className='_link nav-link'>Home</Link>
            <Link to={'/how-it-works/#'} className='_link nav-link'>How it works?</Link>
            <span role='button' onClick={() => handleJump('/#Features')} className='_link nav-link'>Features</span>
            <span role='button' onClick={() => handleJump('#Pricing')} className='_link nav-link'>Pricing</span>
            <span role='button' onClick={() => handleJump('/how-it-works/#Showcase')} className='_link nav-link'>Showcase</span>
          </div>

          <div className='d-flex flex-column justify-content-start align-items-start gap-3 ' style={{ marginTop: !points.md && "30px" }}>
            <h6 style={{ fontSize: "20px" }}>Terms</h6>
            <Link to={'/privacy-and-policy'} className='_link nav-link'>Privacy & Policy </Link>
            <Link to={'/disclaimer'} className='_link nav-link'>Disclaimer</Link>
            {/* <Link to={'/dmca-policy'} className='_link nav-link'>DMCA</Link> */}
            <Link to={'/terms-and-conditions'} className='_link nav-link'>Terms & Conditions</Link>
          </div>

          <div className='d-flex flex-column justify-content-start align-items-start gap-3 ' style={{ marginTop: !points.md && "50px" }}>
            <h6 style={{ fontSize: "20px" }}>Contact</h6>
            <a className='text-white _link' href="mailto:ask@sawal.co">Ask@sawal.co</a>
            <a className='text-white _link' href="tel:+447466292272">+44-746-629-2272</a>
            <span className='text-white'>25 Badminton Road, Manchester, United Kingdom.</span>
            <div className='d-flex flex-wrap gap-2'>
              <a className='_link text-white' href="https://www.facebook.com/Hadielearningofficial " target="_">  <FaFacebook size={18} role='button' /> </a>
              <a className='_link text-white' href="https://instagram.com/hadielearningofficial" target="_">  <FaInstagram size={18} role='button' /></a>
              {/* <a className='_link text-white' >  <FaTwitter size={18} role='button' /> </a> */}
              <a className='_link text-white' href="">    <FaLinkedin size={18} role='button' /> </a>
              <a className='_link text-white' href=''> <FaYoutube size={18} role='button' /> </a>
            </div>

          </div>

        </div>


        <div className='d-flex justify-content-center text-white py-4 _link'>
          <p>
            Copyright © <Link className='_link text-white' href={"/"}>SAWAL</Link> | Developed by{" "}
            <a className='_link text-white' href="https://cycarts.com" target="#">
              Cycarts
            </a>
          </p>
        </div>
      </div>
    </div >
  )
}

export default Footer