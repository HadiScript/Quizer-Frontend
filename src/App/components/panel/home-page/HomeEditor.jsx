import { Button, Form, Drawer, Popconfirm, } from 'antd';
import HeaderEditor from './HeaderEditor';
import { useState } from 'react';
import BannerEditor from './BannerEditor';
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import QuizzAdd from './QuizzAdd';
import { useHomePageQuizzes } from '../../../../actions/_homePage';
import toast from 'react-hot-toast';


const HomeEditor = ({ setOpenDrawer, openDrawer, values, setValues, submit, isLoading }) => {


  const [showHeader, setShowHeader] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showQuizzes, setShowQuizzes] = useState(false)
  const [height, setHeight] = useState(60)

  const { isLoading: QuizLoading, data } = useHomePageQuizzes()
  return (
    <Drawer
      title={
        <div className=' d-flex justify-content-end align-items-end'>
          <FaLongArrowAltUp role='button' size={30} onClick={() => setHeight(height === 100 ? 100 : height + 20)} />
          <FaLongArrowAltDown role='button' size={30} onClick={() => setHeight(height - 20)} />
        </div>
      }
      placement="bottom"
      onClose={() => setOpenDrawer(false)} open={openDrawer} height={`${height}%`}
    >

      {/* {JSON.stringify(data[0])}
      <p>Asd
      </p>

      {JSON.stringify(values?.quizzes[0])} */}

      <div className="container">
        <Form onFinish={submit} layout="horizontal" >
          <div style={{ width: "100%" }} className='mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <h5>Header Settings</h5>
              <span role='button' onClick={() => setShowHeader(!showHeader)}>{!showHeader ? "Show Header" : "Hide Header"}</span>
            </div>
            {showHeader && <HeaderEditor values={values} setValues={setValues} />}
          </div>


          <div style={{ width: "100%" }} className='mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <h5>Banner settings</h5>
              <span role='button' onClick={() => setShowBanner(!showBanner)}>{!showBanner ? "Show Banner" : "Hide Banner"}</span>
            </div>
            {showBanner && <BannerEditor values={values} setValues={setValues} />}
          </div>

          <div style={{ width: "100%" }} className='mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <h5>Add Quizzes</h5>
              <span role='button' onClick={() => setShowQuizzes(!showQuizzes)}>{!showQuizzes ? "Show Banner" : "Hide Banner"}</span>
            </div>
            {showQuizzes && <QuizzAdd values={values} setValues={setValues} data={data} loading={QuizLoading} />}
          </div>







          <Form.Item type="submit">
            <div className='d-flex justify-content-between algin-items-center mt-5'>
              <Button className='myBtn' loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>

              <Popconfirm
                title="Delete this home page"
                description="Are you sure to delete home page?"
                okText="Yes"
                cancelText="No"
                onConfirm={()=>toast.success("delete success fully")}
              >
                <Button danger>Delete this home page</Button>
              </Popconfirm>
            </div>
          </Form.Item>


        </Form>
      </div>

    </Drawer>
  )
}

export default HomeEditor