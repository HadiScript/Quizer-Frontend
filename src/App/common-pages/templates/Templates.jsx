import { useState } from "react";
import { quizApi, surveyApi } from "../../../helper/API";
import { useEffect } from "react";
import axios from "axios";
import { Button, Card, Grid } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;



export const TemplateItems = ({ key, item, }) => {
  return <div className="col-12 col-md-3 mt-2" key={key} >
    <Link className="_link" to={`/template-preview/${item?.slug}/${item?.createdBy?._id}?from=home`}>
      <Card
        hoverable
        cover={<img alt="example" src={item?.templateImage?.url} />}
      >

        <Meta title={item?.title} description={`Total Fields: ${item?.fields?.length}`} />

      </Card>
    </Link>
  </div>
}

const Templates = () => {

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
    <div style={{ marginBottom: points.md ? "100px" : "50px" }}>
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>Templates</h1>
        <p>Discover the edge of this innovative app.</p>
      </div>

      <div className="container">

        <div className="row ">
          {quizzes?.map((x, index) => <TemplateItems key={index} item={x} />)}
        </div>

        <div className="text-center mt-4">
          <Link className="_link" to={`/all-templates`}>  <Button type="" className="myBtn">See All</Button></Link>
        </div>
      </div>


    </div>
  )
}

export default Templates