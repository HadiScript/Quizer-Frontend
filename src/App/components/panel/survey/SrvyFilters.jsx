import { Button, Drawer, } from "antd";
import { useAllFieldsData } from "../../../../actions/_survey";
import { useParams } from "react-router-dom";
import { useState } from "react";
import RadioVisualize from "./RadioVisualize";
import CheckboxVisualize from "./RatingVisualize";
import RateVisualize from "./RateVisualize";
import DropdownVisualize from "./DropdownVisualize";
import { BarChartOutlined, DotChartOutlined, DownloadOutlined, PieChartOutlined, ScheduleOutlined } from "@ant-design/icons";
import { FaChartLine } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";


export const HintPick = () => (
  <div style={{ width: "100%", height: "200px", color: "#155e75" }} className="d-flex flex-column gap-3 align-items-center justify-content-center">
    <FaCircleInfo size={50} />
    <h4>Please select any question from dropdown</h4>
  </div>
)

const SrvyFilters = () => {
  const { slug } = useParams()
  const [whichOne, setWhichOne] = useState("")
  const { data, isLoading } = useAllFieldsData(slug)
  const [open, setOpen] = useState(false);


  const selectOne = (str) => {
    setWhichOne(str);
    setOpen(true)
  }


  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="mt-4 d-flex flex-wrap align-items-start gap-1">
          <Button className="myBtn" icon={<PieChartOutlined />} onClick={() => selectOne("radio")}>Visualize Radio Fields</Button>
          <Button className="myBtn" icon={<BarChartOutlined />} onClick={() => selectOne("checkbox")}>Visualize Checkbox Fields</Button>
          <Button className="myBtn" icon={<DotChartOutlined />} onClick={() => selectOne("rating")}>Visualize Rating Fields</Button>
          <Button className="myBtn" icon={<FaChartLine />} onClick={() => selectOne("dropdown")}>Dropdown Rating Fields</Button>
        </div>
        {/* <div className="mt-4 d-flex align-items-start  gap-1">
          <Button onClick={() => setOverviewOpen(true)} className="dottedBtn" icon={<ScheduleOutlined />} >Overview</Button>
          <Button className="dottedBtn" icon={<DownloadOutlined />} >Export Data</Button>
        </div> */}
      </div>

      <Drawer
        id="filterDrawer"
        title={<div className="title">{whichOne[0]?.toUpperCase()}{whichOne?.slice(1)} Data Visualizations</div>}
        height={'85%'}
        placement={"bottom"}
        onClose={() => setOpen(false)}
        open={open}
        className="drawerLinearBg"
      // style={{ backgroundColor: "#083344" }}
      >
        {/* {JSON.stringify(data?.dropdownFields)} */}

        {whichOne === "radio" && <RadioVisualize data={data?.radioFields} />}
        {whichOne === "checkbox" && <CheckboxVisualize data={data?.checkboxFields} />}
        {whichOne === "rating" && <RateVisualize data={data?.rateFields} />}
        {whichOne === "dropdown" && <DropdownVisualize data={data?.dropdownFields} />}
      </Drawer>



    </>

  )
}

export default SrvyFilters