import axios from 'axios';
import { useEffect, useState } from 'react'
import { API } from '../../../helper/API';
import { Alert, Modal } from 'antd';

import '../../../assets/css/template.css'


const Templates = ({ open, setOpen, _settings, _setSettings }) => {


  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(_settings.certificateId)


  const fetching = async () => {

    try {
      const res = await axios.get(`${API}/api/template`, {});
      setTemplates(res.data)
    } catch (error) {
      Errs(error)
    }
  }

  useEffect(() => {
    fetching()
  }, [])

  const selectHandler = (x) => {
    setSelected(x);
    _setSettings(prev => ({ ...prev, certificateId: x }))
  }


  return (
    <Modal
      title={<span className='display-6'>Template Gallery</span>}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={'100%'}
      footer={null}
    >
      <Alert message="Please select an template of certificate. Just tap on a template" showIcon closable />
      <div style={{ height: "80vh" }} className='d-flex flex-column align-items-center gap-2'>
        <div class="d-flex justify-content-start gap-3 flex-wrap mt-4" >

          {
            templates?.map
              (
                x =>
                  <div
                    onClick={() => selectHandler(x._id)}
                    key={x._id}
                    style={{ border: selected === x._id ? "1px solid grey" : "" }}
                    role='button'
                    className='p-2 rounded-2'
                  >
                    <img style={{ height: "150px" }} src={x?.image} alt="image certificates" />
                  </div>
              )
          }
        </div>
      </div>
    </Modal>
  )
}

export default Templates