import { Button, } from "antd";
import React, { useState } from "react";
import Heading from "../../components/common/Heading";
import QuizGrid from "../../components/panel/QuizGrid";
import { InsertRowAboveOutlined, OrderedListOutlined, TableOutlined, } from "@ant-design/icons";
import { _useAllMyQuizes } from "../../../actions/_quiz";
import SubcriberLayout from "../../components/layouts/Layout";
import QuizTable from "../../components/panel/QuizTable";

const AllQuizes = () => {
  const { list, loading } = _useAllMyQuizes();
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


  return (
    <SubcriberLayout>
      <Heading title={"All Quizes"} Icon={<OrderedListOutlined className="its-icon" />} desc={`${loading ? "loading... " : list.length}/10 Questions`} />
      <div className="text-end mb-2">
        <ShowInIcons />
      </div>

      <div className="row ">
        {showIn === 'grid' ?
          <QuizGrid list={list} loading={loading} />
          :
          <QuizTable list={list} loading={loading} />
        }
      </div>


    </SubcriberLayout>
  );
};

export default AllQuizes;
