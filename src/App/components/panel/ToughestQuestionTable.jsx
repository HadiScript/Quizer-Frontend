import { Card, List } from "antd";

const data = [
  {
    question: "What is React?",
    count: 23,
  },
  {
    question: "JSX?",
    count: 23,
  },
  {
    question: "React is framwork??",
    count: 123,
  },
  {
    question:
      "provides plenty of UI components to enrich your web applications, and we will improve components experience consistently. We also recommend some great Third-Party Libraries additionally.?",
    count: 23,
  },
];

const ToughestQuestionTable = () => {
  return (
    <Card className="table-box m-1" style={{ height: 350, overflowY: "scroll" }}>
      <h6>Toughest Questions</h6>

      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.question} actions={[<span>Incorrect: {item.count}</span>]}>
            {item.question.length > 50 ? item.question.slice(0, 50) + "..." : item.question}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ToughestQuestionTable;
