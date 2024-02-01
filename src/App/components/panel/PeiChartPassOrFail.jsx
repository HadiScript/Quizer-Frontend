import { Card } from "antd";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { usePassFail } from "../../../actions/_attempt-users";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const COLORS = ["#06b6d4", "#164e63"];

const PeiChartPassOrFail = () => {
  const { id } = useParams();

  const { data, loading } = usePassFail(id);

  return (
    <div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          {loading ? (
            <LoadingOutlined />
          ) : (
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie dataKey="value" data={data} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeiChartPassOrFail;
