import { Divider, Modal } from 'antd'
import React from 'react'
import LoginComponent from './LoginComponent'
import { _useCommon } from '../../../actions/_common';

const ModelLogin = ({ open, setOpen, mesg }) => {

  const { email, setEmail, password, setPassword, Login, loginwithgoogle, loading } = _useCommon();

  const onFinish = (values) => {
    Login(false);
    setOpen(false)
  };



  return (
    <Modal open={open} onCancel={() => setOpen(false)} className='' width={'auto'} centered footer={null}>
      <div className="d-flex align-items-center flex-column gap-2 mt-3">

        <LoginComponent
          from={"modal"}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          Login={Login}
          loginwithgoogle={loginwithgoogle}
          loading={loading}
          onFinish={onFinish}
        />
      </div>
    </Modal>
  )
}

export default ModelLogin