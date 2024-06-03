import { Button, Card } from 'antd'
import React from 'react'
import { IoCreateOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const CreateQuizCTAHeading = () => {
  return (
    <Card className='linearBg'>
      <Card.Meta

        title={<h3 className='text-white'>Create Your First Quiz</h3>}
        description={<p className='text-white'>In publishing and graphic design, Lorem ipsum is a placeholder text </p>}
      />

      <Link to={'/subscribe/create-quiz'} className='text-decoration-none' >
        <Button className='d-flex gap-2 align-items-center mt-2'>
          Create Quiz <IoCreateOutline size={18} />
        </Button>
      </Link>
    </Card>
  )
}

export default CreateQuizCTAHeading