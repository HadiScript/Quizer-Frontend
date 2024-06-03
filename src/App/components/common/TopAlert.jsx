import { Alert, Button } from 'antd'
import React from 'react'

const TopAlert = () => {
  return (
    <Alert
      message="Success Tips"
      type="success"
      description="Error Description Error Description Error Description Error Description"

      // showIcon
      action={
        <Button size="small" type="text">
          UNDO
        </Button>
      }
      closable
    />
  )
}

export default TopAlert