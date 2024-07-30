import { Card, Grid } from 'antd'
import { MdOutlineSettingsSuggest, MdOutlineFormatAlignLeft, } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCheckDouble } from "react-icons/fa6";
import { FaLaptop, FaWpforms, FaRegCalendarTimes, FaMagic } from "react-icons/fa";




const itemsData = [
  {
    title: "AI Feature",
    description: "Use AI for smart suggestions, making your surveys more engaging. Stay tuned for more updates!",
    Icon: <FaMagic color='#0369a1' size={30} />
  },
  {
    title: "Free Account",
    description: "Start for free with basic features, and upgrade to advanced tools including Business and Enterprise.",
    Icon: <FaCheckDouble color='#0369a1' size={30} />
  },
  {
    title: "Multiple Settings",
    description: "Customize each quiz and survey individually. Global settings apply to all without specific adjustments.",
    Icon: <MdOutlineSettingsSuggest color='#0369a1' size={30} />
  },
  {
    title: "Multiple Dashboards",
    description: "Separate dashboards for each quiz and survey, with customized settings for user's ease.",
    Icon: < LuLayoutDashboard color='#0369a1' size={30} />
  },

  {
    title: "Quiz Display Settings",
    description: "Easily choose from various layouts to give each quiz a unique look and feel.",
    Icon: <FaLaptop color='#0369a1' size={30} />
  },

  {
    title: "Multiple Survey Fields",
    description: "Add various input fields like drop downs, radio buttons, check boxes, rating scales, range and many more.",
    Icon: <FaWpforms color='#0369a1' size={30} />
  },

  {
    title: "Survey Reporting",
    description: "Analyze and visualize your survey results with detailed statistics and graphical representation for each question.",
    Icon: <MdOutlineFormatAlignLeft color='#0369a1' size={30} />
  },

  {
    title: "Quiz Scheduling",
    description: "Schedule your quizzes to ensure they reach your audience at the perfect time. Moreover, set time limits for quizzes.",
    Icon: <FaRegCalendarTimes color='#0369a1' size={30} />
  },




]

const Items = ({ key, item }) => {
  return <div className="col-12 col-md-3 mt-2" key={key} >
    <Card hoverable>
      <div className="d-flex flex-column align-items-start gap-2">
        {item?.Icon}
        <h6 style={{ color: "#164e63" }} >{item?.title}</h6>
        <p style={{ color: "#164e63" }}>{item?.description}</p>
      </div>

    </Card>
  </div>
}

const Benifits = () => {

  const points = Grid.useBreakpoint()

  return (
    <div id='Benefits' style={{ marginBottom: points.md ? "100px" : "50px" }} >
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>Perks of Using SAWAL</h1>
        <p>Discover the edge of this innovative app.</p>
      </div>


      <div className="container">

        <div className="row ">
          {itemsData?.map((x, index) => <Items key={index} item={x} />)}
        </div>
      </div>
    </div>
  )
}

export default Benifits