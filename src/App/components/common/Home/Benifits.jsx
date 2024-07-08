import { Card } from 'antd'
import { MdOutlineSettingsSuggest, MdOutlineFormatAlignLeft, } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCheckDouble } from "react-icons/fa6";
import { FaLaptop, FaWpforms, FaRegCalendarTimes, FaMagic } from "react-icons/fa";




const itemsData = [
  {
    title: "AI Features",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: <FaMagic color='#0369a1' size={30} />
  },
  {
    title: "Free Account",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: < FaCheckDouble color='#0369a1' size={30} />
  },
  {
    title: "Multiple Settings",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: < MdOutlineSettingsSuggest color='#0369a1' size={30} />
  },
  {
    title: "Multiple Dashboards",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: < LuLayoutDashboard color='#0369a1' size={30} />
  },

  {
    title: "Quiz Display Settings",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: <FaLaptop color='#0369a1' size={30} />
  },

  {
    title: "Multiple Survey Fields",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: <FaWpforms color='#0369a1' size={30} />
  },

  {
    title: "Survey Responses",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: <MdOutlineFormatAlignLeft color='#0369a1' size={30} />
  },

  {
    title: "Quiz Availability",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.",
    Icon: <FaRegCalendarTimes color='#0369a1' size={30} />
  },




]

const Items = ({ key, item }) => {
  return <div className="col-12 col-md-3 mt-2" key={key} >
    <Card hoverable>
      <div className="d-flex flex-column align-items-start gap-2">
        {item?.Icon}
        <h6 style={{ color: "#164e63" }} >{item?.title}</h6>
        <p style={{ color: "#164e63" }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used </p>
      </div>

    </Card>
  </div>
}

const Benifits = () => {

  return (
    <div id='Benefits' style={{ marginBottom: "100px" }} >
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>Benefits</h1>
        <p>Check out how you it can give you Benefits.</p>
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