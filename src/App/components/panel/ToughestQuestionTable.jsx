import { Card, Checkbox, List } from "antd";
import { useToughestQuestions } from "../../../actions/_attempt-users";
import { useParams } from "react-router-dom";
import { gettingData } from "../../../helper/GetData";



const ToughestQuestionTable = ({ from = "dashboard", setToughestQuestions, toughestQuestions }) => {
  const { id } = useParams();

  const { list, loading } = useToughestQuestions(id);


  const checkBoxChanger = (e) => {
    if (e.target.checked) {
      setToughestQuestions([...toughestQuestions, e.target.value])
    } else if (!e.target.checked) {
      setToughestQuestions(toughestQuestions.filter(x => x !== e.target.value))
    }

  }



  return (
    <Card className="table-box m-1" style={{ height: 350, overflowY: "scroll", overflowX: "hidden" }}>
      <h6>Toughest Questions </h6>

      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.text ? item.text : "nothing"} actions={[
            <span key={"incorrectcount"}>Incorrect: {item.incorrectCount}</span>,
            <span>{from === 'all-questions' && <Checkbox onChange={checkBoxChanger} value={item.questionId} type="checkbox" />}</span>
          ]}>
            <div dangerouslySetInnerHTML={{ __html: item.text ? gettingData(item.text, 100) : "Question deleted" }} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ToughestQuestionTable;
