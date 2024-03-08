import { Grid, Select } from 'antd';


const SearchBard = () => {
  const points = Grid.useBreakpoint();

  return (
    <Select
      showSearch
      style={{
        width: (points.xs || points.sm) && "80%",
      }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.value ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
      }
    >


      <Select.Option className="py-2" value="questions">Questions </Select.Option>
      <Select.Option className="py-2" value="quiz">Quiz</Select.Option>
      <Select.Option className="py-2" value="quizzes">Quizzes</Select.Option>
      <Select.Option className="py-2" value="create-quiz">Create Quiz</Select.Option>
      <Select.Option className="py-2" value="update-quiz">Update Quiz</Select.Option>
      <Select.Option className="py-2" value="add-questions">Add Questions</Select.Option>
      <Select.Option className="py-2" value="quiz-dashboard">Quiz Dashboard</Select.Option>

    </Select>
  )
};
export default SearchBard;