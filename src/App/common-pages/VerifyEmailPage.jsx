import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Errs } from '../../helper/Errs'
import axios from 'axios'
import { authApi } from '../../helper/API'
import toast from 'react-hot-toast'
import { LoadingOutlined } from '@ant-design/icons'

const VerifyEmailPage = () => {

  const search = useLocation().search?.split("=")[1]
  const [loading, setLoading] = useState(false)
  const router = useNavigate()

  useEffect(() => {
    if (!search) return null;
    verifying();
  }, [search])

  const verifying = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${authApi}/verifying-email/?token=${search}`)
      if (data.ok) {
        router('/signin')
        toast.success("Email is verified")
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  }




  return (
    <div style={{ minHeight: "100vh" }}>
      <LoadingOutlined /> <span>Please wait...</span>
    </div>
  )
}

export default VerifyEmailPage