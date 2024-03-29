import React from 'react';
import {
  Container,
  Row,
  Col,
  Image
} from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/core';
import { Link } from 'react-router-dom';


// import images
import phoneFream from "../../../../assets/images/testi/phone-fream.png"
import img1 from "../../../../assets/images/testi/ss/img1.png";
import img2 from "../../../../assets/images/testi/ss/img2.png";
import img3 from "../../../../assets/images/testi/ss/img3.png";
import img4 from "../../../../assets/images/testi/ss/img4.png";
import img5 from "../../../../assets/images/testi/ss/img5.png";
import img6 from "../../../../assets/images/testi/ss/img6.png";
import img7 from "../../../../assets/images/testi/ss/img7.png";
import img8 from "../../../../assets/images/testi/ss/img8.png";


const Application = () => {

  return (
    <React.Fragment>
      <section className="section app-slider bg-light" id="app">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="sec-hd">
                <span className="heading"></span>
                <h2 className="sec-title">Our App Screenshots</h2>
                <span className="heading"></span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className="swiper swiper-container swiper-container1">
                <div className="fream-phone">
                  <Image src={phoneFream} alt="" fluid />
                </div>
                <div className="swiper-wrapper">
                  <Swiper
                    loop={true}
                    slidesPerView={5}
                    spaceBetween={50}
                    centeredSlides={true}
                    speed={5000}
                    autoplay={{
                      delay: 500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation]}
                  >
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img1} title="" > </Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img1} className="lightbox img-fluid" >
                            <Image src={img1} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img2} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img2} className="lightbox img-fluid">
                            <Image src={img2} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img3} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img3} className="lightbox img-fluid">
                            <Image src={img3} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img4} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img4} className="lightbox img-fluid">
                            <Image src={img4} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img5} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img5} className="lightbox img-fluid">
                            <Image src={img5} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img6} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img6} className="lightbox img-fluid">
                            <Image src={img6} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img7} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img7} className="lightbox img-fluid">
                            <Image src={img7} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img7} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img7} className="lightbox img-fluid">
                            <Image src={img7} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-radius">
                      <div className="app-screenshot-item text-center d-flex justify-content-center">
                        <div className="app-screenshot-overlayer">
                          <Link className="mfp-image img-fluid" to={img8} title=""></Link>
                        </div>
                        <div className="screenshot-img mb-4">
                          <Link to={img8} className="lightbox img-fluid">
                            <Image src={img8} alt="" className="img-fluid" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Application;