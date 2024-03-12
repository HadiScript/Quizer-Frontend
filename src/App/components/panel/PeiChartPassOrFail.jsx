import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { LoadingOutlined } from "@ant-design/icons";

const COLORS = ["#06b6d4", "#164e63"];

const PeiChartPassOrFail = ({ resultForPeiChart, isLoading }) => {

  return (
    <div>
      <div style={{ width: "100%", height: 300 }}>
        {isLoading && <LoadingOutlined />}
        <ResponsiveContainer>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie dataKey="value" data={resultForPeiChart} fill="#8884d8" label>
              {resultForPeiChart?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeiChartPassOrFail;
