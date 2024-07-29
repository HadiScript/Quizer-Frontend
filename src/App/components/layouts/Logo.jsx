import React from 'react'
import { useAuth } from '../../../context/authContext'
import { toImageUrl } from '../../../helper/API';

import itsLogo from '../../../assets/imgs/logo.png'

const MyLogo = () => <img src={itsLogo} alt='logo' style={{ height: "50px", }} />

const Logo = ({ from = "sidebar" }) => {
  const [auth] = useAuth();
  return (
    <>
      {auth?.user?.logo ?
        <img src={toImageUrl(auth?.user?.logo)} style={{ maxHeight: "50px", width: from === "sidebar" ? "auto" : "100px" }} />
        : from === "settings" ? null :
          <MyLogo />
      }
    </>
  )
}

export default Logo