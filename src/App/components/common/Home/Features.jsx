import React, { useState } from 'react';
import { Row, Col } from 'antd';

import Tetris from './technology-comp/Tetris';
import Column from './technology-comp/Column';
import Coordinate from './technology-comp/Coordinate';
import Building from './technology-comp/Building';

const pageData = [
  {
    title: 'Create Quiz',
    content: 'Afraid of a tedious quiz-creating process? Not anymore. Create extensive quizzes swiftly with sawal.',
    Bg: Tetris,
  },
  {
    title: 'Dashboards',
    content: 'Analyze your quiz questions and results through our detailed virtual representation with various options and parameters.',
    Bg: Column,
  },
  {
    title: 'Settings',
    content: 'Customize your quizzes through our special settings in the control panel.',
    Bg: Coordinate,
  },
  {
    title: 'Forms',
    content: 'Sawal helps you create interactive forms with ease by using its expansive options.',
    full: true,
    Bg: Building,
  },
];

const Features = ({ isMobile }) => {
  const [hover, setHover] = useState(null);

  const onMouseEnter = (title) => setHover(title);
  const onMouseLeave = () => setHover(null);

  return (
    <div key="features" id="Offers" className='home-page-wrapper feature8-wrapper' style={{ marginTop: "100px", marginBottom: "100px" }}>
      <div className="home-page feature8">
        <div className='feature8-title-wrapper'>
          <h1 style={{ fontWeight: "600" }}>What Sawal has to offer to you</h1>
          <p>Sawal has unlimited quiz-related options in store for you.</p>
        </div>
        <Row className="d-flex flex-wrap">
          {pageData.map((item, i) => (
            <Col
              key={i.toString()}
              lg={item.full ? 24 : 8}
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
