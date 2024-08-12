import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/authContext'
import { Button, Drawer, } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { AiOutlineMenuFold } from "react-icons/ai";
import logoImage from '../../../../assets/imgs/logo.png'


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
        <img src={logoImage} alt='logo' height={60} />
        <div className='d-none d-lg-flex justify-content-start align-items-center gap-3'>

          <Link className='header-link _link' to={'/'} role='button'>Home</Link>
          <Link className='header-link _link' to={'/how-it-works'} role='button'>How it works?</Link>
          <span className='header-link _link' onClick={() => handleJump("/#Features")} role='button'>Features</span>
          <span className='header-link _link' onClick={() => handleJump('/how-it-works#Screenshots')} role='button'>Showcase</span>
          <span className='header-link _link' onClick={() => handleJump('#Pricing')} href='#Pricing' role='button'>Pricing</span>


          {!auth?.token && <Link to={'/signin'}>
            <button className='button'>Get started for free</button>
          </Link>}

          {auth?.token && (auth?.user?.role === "subscriber" || auth?.user?.role === "super-user") && <Link to={'/subscribe'}>
            <Button className='button' icon={<LoginOutlined className='mx-2' />} >Dashboard</Button>
          </Link>}
        </div>
        <AiOutlineMenuFold color='#083344' onClick={() => setOpen(true)} size={23} className='d-block d-lg-none' />
      </div>
      <Drawer className='mobile-drawer' onClose={() => setOpen(false)} open={open} width={320} closable={false}>
        <ul className="list-group list-group-flush p-3">
          <div className="text-start">
            <img src={'/sawal1.png'} alt='logo' height={80} />
          </div>
          <li className="list-group-item mt-4"><Link className='header-link _link' to={'/'} role='button'>Home</Link></li>
          <li className="list-group-item"><Link className='header-link _link' to={'/how-it-works'} role='button'>How it works?</Link></li>
          <li className="list-group-item"><span className='header-link _link' onClick={() => handleJump("/#Features")} role='button'>Features</span></li>
          <li className="list-group-item"><span className='header-link _link' onClick={() => handleJump('/how-it-works#Screenshots')} role='button'>Showcase</span></li>
          <li className="list-group-item"><span className='header-link _link' onClick={() => handleJump('#Pricing')} href='#Pricing' role='button'>Pricing</span></li>
          {!auth?.token &&
            <li className='list-group-item'>
              <Link to={'/signin'}>
                <Button className='primaryBtn'>Get started for free</Button>
              </Link>
            </li>
          }
          <li className='list-group-item'>
            {auth?.token && auth?.user?.role === "subscriber" && <Link to={'/subscribe'}>
              <Button className='primaryBtn' icon={<LoginOutlined className='mx-2' />} >Dashboard</Button>
            </Link>}
          </li>

        </ul>

        {/* <div className='list-group list-group-flush d-flex flex-column align-items-center p-2 header3 gap-3 px-4' >
          <img src={logoImage} alt='logo' height={60} />
          <Link className='header-link _link' to={'/'} role='button'>Home</Link>
          <Link className='header-link _link' to={'/how-it-works'} role='button'>How it works?</Link>
          <span className='header-link _link' onClick={() => handleJump("/#Features")} role='button'>Features</span>
          <span className='header-link _link' onClick={() => handleJump('/how-it-works#Screenshots')} role='button'>Showcase</span>
          <span className='header-link _link' onClick={() => handleJump('#Pricing')} href='#Pricing' role='button'>Pricing</span>


          {!auth?.token && <Link to={'/signin'}>
            <button className='button'>Get started for free</button>
          </Link>}

          {auth?.token && auth?.user?.role === "subscriber" && <Link to={'/subscribe'}>
            <Button className='button' icon={<LoginOutlined className='mx-2' />} >Dashboard</Button>
          </Link>}
        </div> */}
      </Drawer >
    </>
  )
}

export default Navbar