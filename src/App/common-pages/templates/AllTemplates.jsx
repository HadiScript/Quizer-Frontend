import { Button, Grid } from "antd"
import { Nav30DataSource } from "../../../data/data.source"
import useResponsive from "../../../hooks/useBreakpoints"
import Navbar from "../../components/common/Home/Navbar"
import Footer from "../../components/common/Home/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { surveyApi } from "../../../helper/API"
import { LoadingOutlined } from "@ant-design/icons"
import { TemplateItems } from "./Templates"

const AllTemplates = () => {
  const { isMobile } = useResponsive();


  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const points = Grid.useBreakpoint()


  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      console.log("sned");

      // const response = await axios.get(`${quizApi}/exported/templates`);
      const response = await axios.get(`${surveyApi}/exported/templates`);
      console.log("adter");

      const { surveys: newQuizzes, totalPages } = response.data;
      console.log(response, "am")
      setQuizzes(newQuizzes);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  return (
    <div className="templates-wrapper">

      <Navbar
        id="Navbar"
        key="navbar"
        dataSource={Nav30DataSource}
        isMobile={isMobile}
      />

      <div className="container mt-5">
        <div className='feature8-title-wrapper'>
          <h1 style={{ fontWeight: "600" }}>Templates</h1>
          <p>Discover the edge of this innovative app.</p>
        </div>
        <div className="d-flex align-items-center gap-3 border-bottom pb-2 mb-4">
          <Button className="myBtn">Survey Templates</Button>
          <Button className="" type="dashed">Quiz Templates</Button>
        </div>

        <div>
          {loading && <div className="text-center" style={{ minHeight: "300px" }}> <LoadingOutlined /> </div>}
          <div className="row my-5" >
            {quizzes?.map((x, index) => <TemplateItems key={index} item={x} />)}
          </div>

        </div>
      </div>

      <Footer />

    </div>
  )
}

export default AllTemplates