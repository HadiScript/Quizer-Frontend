import React from 'react'

const FooterSection = ({
  container,
  bgColor,
  textColor,
}) => {
  return (
    <div style={{ width: "100%", backgroundColor: bgColor, color: textColor }} >
      <div className={`${container && 'container'} d-flex justify-content-center py-3`}>
        Copyright © Quizer | Developed by Cycarts
      </div>
    </div>
  )
}

export default FooterSection