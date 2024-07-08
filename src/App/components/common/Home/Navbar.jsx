import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/authContext'
import { Button, Drawer, } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { AiOutlineMenuFold } from "react-icons/ai";


const Navbar = () => {
  const [auth] = useAuth();
  const [open, setOpen] = useState(false)

  const navigate = useNavigate();

  const handleJump = (path) => {
    navigate(path);
  };



  return (
    <>
      <div className='header3 container mx-auto py-3 d-flex justify-content-between align-items-center'>
        <h2>Quizer Logo</h2>
        <div className='d-none d-lg-flex justify-content-start align-items-center gap-3'>

          <Link className='header-link _link' to={'/'} role='button'>Home</Link>
          <Link className='header-link _link' to={'/how-it-works'} role='button'>How it works?</Link>
          <span className='header-link _link' onClick={() => handleJump("/#Features")} role='button'>Features</span>
          <span className='header-link _link' onClick={() => handleJump('/how-it-works#Screenshots')} role='button'>Showcase</span>
          <span className='header-link _link' onClick={() => handleJump('#Pricing')} href='#Pricing' role='button'>Pricing</span>


          {!auth?.token && <Link to={'/signup'}>
            <button className='button'>Get Started Free</button>
          </Link>}

          {auth?.token && auth?.user?.role === "subscriber" && <Link to={'/subscribe'}>
            <Button className='button' icon={<LoginOutlined className='mx-2' />} >Dashboard</Button>
          </Link>}
        </div>
        <AiOutlineMenuFold color='#083344' onClick={() => setOpen(true)} size={23} className='d-block d-lg-none' />
      </div>
      <Drawer onClose={() => setOpen(false)} open={open} width={200}>
        <div className='d-flex flex-column p-2 header3 gap-3 ' >
          <Link className='header-link _link' to={'/'} role='button'>Home</Link>
          <Link className='header-link _link' to={'/how-it-works'} role='button'>How it works?</Link>
          <span className='header-link _link' onClick={() => handleJump("/#Features")} role='button'>Features</span>
          <span className='header-link _link' onClick={() => handleJump('/how-it-works#Screenshots')} role='button'>Showcase</span>
          <span className='header-link _link' onClick={() => handleJump('#Pricing')} href='#Pricing' role='button'>Pricing</span>


          {!auth?.token && <Link to={'/signup'}>
            <button className='button'>Get Started Free</button>
          </Link>}

          {auth?.token && auth?.user?.role === "subscriber" && <Link to={'/subscribe'}>
            <Button className='button' icon={<LoginOutlined className='mx-2' />} >Dashboard</Button>
          </Link>}
        </div>
      </Drawer>
    </>
  )
}

export default Navbar