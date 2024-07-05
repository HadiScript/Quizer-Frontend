import React from 'react'
import { useAuth } from '../../../context/authContext'
import { toImageUrl } from '../../../helper/API';

const Logo = ({ from = "sidebar" }) => {
  const [auth] = useAuth();
  return (
    <>
      {auth?.user?.logo ?
        <img src={toImageUrl(auth?.user?.logo)} style={{ maxHeight: "50px", width: from === "sidebar" ? "auto" : "100px" }} /> : from === "settings" ? null : <h3 className={from === 'survey' ? "text-dark" : "text-white"}>Quizer App</h3>
      }
    </>
  )
}

export default Logo