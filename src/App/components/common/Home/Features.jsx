import React, { useState } from 'react';
import { Row, Col } from 'antd';

import Tetris from './technology-comp/Tetris';
import Column from './technology-comp/Column';
import Coordinate from './technology-comp/Coordinate';
import Building from './technology-comp/Building';

const pageData = [
  {
    title: 'Create Quiz',
    content: 'n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying',
    Bg: Tetris,
  },
  {
    title: 'Dashboards',
    content: 'n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying',
    Bg: Column,
  },
  {
    title: 'Settings',
    content: 'n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying',
    Bg: Coordinate,
  },
  {
    title: 'Display Settings',
    content: 'n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying',
    full: true,
    Bg: Building,
  },
];

const Features = ({ isMobile }) => {
  const [hover, setHover] = useState(null);

  const onMouseEnter = (title) => setHover(title);
  const onMouseLeave = () => setHover(null);

  return (
    <div key="features" id="features" className='home-page-wrapper feature8-wrapper' style={{ marginTop: "100px", marginBottom: "100px" }}>
      <div className="home-page feature8">
        <div className='feature8-title-wrapper'>
          <h1 style={{ fontWeight: "600" }}>What you will get</h1>
        </div>
        <Row className="d-flex flex-wrap">
          {pageData.map((item, i) => (
            <Col
              key={i.toString()}
              md={item.full ? 24 : 8}
              xs={24}
              className="px-2 py-2"
            >
              <div
                className={`border rounded-3 page2-item${item.full ? ' full' : ''}`}
                onMouseEnter={() => onMouseEnter(item.title)}
                onMouseLeave={onMouseLeave}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '300px', // Fixed height
                  background: hover === item.title ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                  transition: 'background 0.3s',
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center"
                }}
              >
                <div className="" style={{ position: 'absolute', bottom: '2px', right: 0, zIndex: -1 }}>
                  {item.Bg && React.createElement(item.Bg, {
                    hover: !isMobile && hover === item.title,
                    isMobile,
                  })}

                  {/* asd */}
                </div>
                <div style={{ padding: '20px', maxWidth: "400px" }}>
                  <h4>{item.title}</h4>
                  <p >{item.content}</p>

                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Features;
