import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/authContext'
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [auth] = useAuth();


  return (
    <div className='header3 container mx-auto py-3 d-flex justify-content-between align-items-center'>
      <h2>Quizer Logo</h2>
      <div className='d-flex justify-content-start align-items-center gap-3'>
        <span role='button'>Home</span>
        <span role='button'>How it works?</span>
        <span role='button'>Features</span>
        <span role='button'>Gallery</span>
        {!auth?.token && <Link to={'/signup'}>
          <button className='button'>Get Started Free</button>
        </Link>}

        {auth?.token && auth?.user?.role === "subscriber" && <Link to={'/subscribe'}>
          <Button className='button' icon={<LoginOutlined />} >Dashboard</Button>
        </Link>}
      </div>
    </div>
  )
}

export default Navbar