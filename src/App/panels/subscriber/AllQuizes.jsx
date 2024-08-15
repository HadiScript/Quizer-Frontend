import { Button, } from "antd";
import React, { useState } from "react";
import Heading from "../../components/common/Heading";
import QuizGrid from "../../components/panel/QuizGrid";
import { InsertRowAboveOutlined, OrderedListOutlined, PlusCircleOutlined, TableOutlined, } from "@ant-design/icons";
import { _useAllMyQuizes } from "../../../actions/_quiz";
import SubcriberLayout from "../../components/layouts/Layout";
import QuizTable from "../../components/panel/QuizTable";
import BgHeading from "../../components/common/BgHeading";
import CreateQuizCTA from "../../components/common/CreateQuizCTA";
import { AllQuizLoading } from "../../components/loadings";
import { useNavigate } from "react-router-dom";

const AllQuizes = () => {
  const {
    list,
    loading,
    setSearch,
    handleSearch,
    handleTableChange,
    pagination,
    data
  } = _useAllMyQuizes();
  const router = useNavigate()
  const [showIn, setShowIn] = useState(localStorage.getItem('showIn') || 'grid')

  const changeHandler = (x) => {
    let fromlocal = localStorage.getItem('showIn');
    if (fromlocal) {
      setShowIn(x);
      localStorage.removeItem('showIn');
      localStorage.setItem('showIn', x);
    } else {
      localStorage.setItem('showIn', x);
      setShowIn(x)
    }
  }

  const ShowInIcons = () => showIn === 'grid' ?
    <Button icon={<TableOutlined />} onClick={() => changeHandler('table')} /> :
    <Button icon={<InsertRowAboveOutlined />} onClick={() => changeHandler('grid')} />
  console.log({ list });


  return (
    <SubcriberLayout>
      <BgHeading
        title={"All Quizes"}
        desc={"List of all the quizzes you have created. Manage, edit and analyze results of your quizzes through their separate dashboards."}
      />



      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button onClick={() => router("/subscribe/create-quiz")} className="myBtn" icon={<PlusCircleOutlined />}>Create Quiz</Button>
        {/* <ShowInIcons /> */}
      </div>


      <div className="row">

        <QuizTable
          setSearch={setSearch}
          handleSearch={handleSearch}
          handleTableChange={handleTableChange}
          pagination={pagination}
          list={list}
          loading={loading}
          data={data}
        />

        {/* {

          showIn === 'grid' ?
            <QuizGrid list={list} loading={loading} />
            :
            <QuizTable
              setSearch={setSearch}
              handleSearch={handleSearch}
              handleTableChange={handleTableChange}
              pagination={pagination}
              list={list}
              loading={loading}
              data={data}
            />

        } */}

      </div>


    </SubcriberLayout>
  );
};

export default AllQuizes;
