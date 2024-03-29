import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import features from "../../../../assets/images/features.png";

const Features = () => {
  return (
    <React.Fragment>
      <section className="section features" id="features">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="sec-hd">
                <span className="heading"></span>
                <h2 className="sec-title">Features for our app</h2>
                <span className="heading"></span>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col lg={4} md={10} data-aos="fade-right">
              <div className="features-box text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-users-alt"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Digital ordering</h5>
                  <p className="text-muted mt-3">
                    The European languages a members the same family their separate tence type specimen book.
                  </p>
                </div>
              </div>

              <div className="features-box mt-5 text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-envelope-minus"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Marketing</h5>
                  <p className="text-muted mt-3">
                    If you are going passage Ipsum you need to be sure there publising desk anything embarrassing.
                  </p>
                </div>
              </div>

              <div className="features-box mt-5 text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-mobile-android-alt"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">POS integration</h5>
                  <p className="text-muted mt-3">
                    The languages only differ in thamar their and their a tha most common cure words consectetur.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="text-center">
                <img src={features} className="img-fluid" data-aos="zoom-in" alt="" />
              </div>
            </Col>
            <Col lg={4} md={10} data-aos="fade-left">
              <div className="features-box">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-calender"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">Logistics</h5>
                  <p className="text-muted mt-3">
                    The European languages a members the same family their separate tence type specimen book.
                  </p>
                </div>
              </div>
              <div className="features-box mt-5">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-bolt"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">Data Management</h5>
                  <p className="text-muted mt-3">
                    If you are going passage Ipsum you need to be sure there publising desk anything embarrassing.
                  </p>
                </div>
              </div>
              <div className="features-box mt-5">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-feedback"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">Analytics</h5>
                  <p className="text-muted mt-3">
                    The languages only differ in thamar their and their a tha most common cure words consectetur.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Features;
