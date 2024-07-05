import { Button, } from 'antd';
import { useState } from 'react';

import '../../../../assets/css/items.scss'

import { FaWpforms } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";


const quizSteps = [
  { number: "1", title: "Fill the title, add require fields, and time limits", },
  { direction: "bottom-left", number: "2", title: "Add Questions", },
  { number: "3", title: "Add suitable settings", },
  { direction: "bottom-left", number: "4", title: "Copy the link and share with you those who will attempt the quiz", },
  { number: "5", title: "Now you can check the each response", },
  { direction: "bottom-right", number: "6", title: "Analyze your Quiz", },
  { number: "7", title: "Done", }
];

const surveySteps = [
  { number: "1", title: "Fill the title, Description", },
  { direction: "bottom-left", number: "2", title: "Add Fields", },
  { number: "3", title: "Preview the survey", },
  { direction: "bottom-left", number: "4", title: "Copy the link and share with you those who will attempt the survey", },
  { number: "5", title: "Now you can check the each response", },
  { direction: "bottom-right", number: "6", title: "Analyze your Survey", },
  { number: "7", title: "Done", }
];



const Item = ({ data }) => <main>
  {data.map((val) => {
    if (val.direction === 'bottom-left') {
      return (
        <div key={val.number} className="item item--bottom item--left">
          <div className="item__number">{val.number}</div>
          <div className="item__topic">
            <div className="item__topic__title" dangerouslySetInnerHTML={{ __html: val.title }}></div>
            <div className="item__topic__author">
              {/* <span>by </span> */}
              <span>{val.author}</span>
            </div>
          </div>
        </div>
      );
    } else if (val.direction === 'bottom-right') {
      return (
        <div key={val.number} className="item item--bottom">
          <div className="item__number">{val.number}</div>
          <div className="item__topic">
            <div className="item__topic__title" dangerouslySetInnerHTML={{ __html: val.title }}></div>
            <div className="item__topic__author">
              {/* <span>by </span> */}
              <span>{val.author}</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={val.number} className="item item--top">
          <div className="item__number">{val.number}</div>
          <div className="item__topic">
            <div className="item__topic__title" dangerouslySetInnerHTML={{ __html: val.title }}></div>
            <div className="item__topic__author">
              {/* <span>by </span> */}
              <span>{val.author}</span>
            </div>
          </div>
        </div>
      );
    }
  })}
</main>


const HowItWorks = () => {
  const [which, setWhich] = useState("quiz")


  return (
    <div id="How It Works" style={{ marginBottom: "0px", marginTop: "100px" }} >
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>How it works</h1>
        <p>Check out how you can create amazing quizzes in mere minutes.</p>
      </div>

      <div className='d-flex justify-content-center gap-3'>
        <Button size='large' icon={<MdOutlineQuiz size={20} />} onClick={() => setWhich('quiz')} style={which === "quiz" ? { backgroundColor: "#0c4a6e", color: "White" } : {}}>Quiz Creation Steps</Button>
        <Button size='large' icon={<FaWpforms size={20}/>} onClick={() => setWhich('survey')} style={which === "survey" ? { backgroundColor: "#0c4a6e", color: "White" } : {}}>Survey Creation Steps</Button>
      </div>

      <div className="container " style={{ marginTop: "200px" }}>
        {which === 'quiz' && <Item data={quizSteps} />}
        {which === 'survey' && <Item data={surveySteps} />}
      </div>
    </div>
  )
}

export default HowItWorks