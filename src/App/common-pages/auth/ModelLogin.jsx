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
    <Modal open={open} onCancel={() => setOpen(false)} className='' centered footer={null}>
      <div className="d-flex bg-danger align-items-center flex-column gap-2 mt-3">
        {/* <div className='px-3' style={{ maxWidth: "400px" }}>
          <p >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual </p>
          <Divider />
        </div> */}
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