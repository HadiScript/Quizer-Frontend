const Banner = (
  {
    height,
    bannerBgColor,
    bannerTextColor,
    border,
    borderRadius,
    bannerContainer,
    text,
    para,
  }
) => {
  return (
    <div className={`${bannerContainer && "container"} d-flex justify-content-center mt-3 mb-3 p-3 ${border && `rounded-${borderRadius}`}`}
      style={{ height: height, background: bannerBgColor, color: bannerTextColor }}
    >

      <div className='d-flex flex-column justify-content-center text-center'>
        <h1> {text} </h1>
        <p>
          {para}
        </p>
      </div>

    </div>
  )
}

export default Banner