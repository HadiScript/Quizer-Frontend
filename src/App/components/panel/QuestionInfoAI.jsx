import { Input, Select } from "antd"

const { Option } = Select

const QuestionInfoAI = ({ questionsDataAi, setQuestionsDataAi }) => {
  return (
    <>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Question Numbers
        </label>
        <Input type="number" id="title" name="title" value={questionsDataAi.questionNumbers} onChange={e => setQuestionsDataAi({ ...questionsDataAi, questionNumbers: e.target.value })} />

      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Questions Level
        </label>


        <Select
          style={{ width: '100%', }}
          value={questionsDataAi.level1}
          onChange={e => setQuestionsDataAi({ ...questionsDataAi, level1: e })}
        >
          <Option value="Bacholors Fresher">Bacholors Fresher</Option>
          <Option value="Masters">Masters</Option>
          <Option value="MPhil">MPhil</Option>
          <Option value="PHD">PHD</Option>
        </Select>
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Questions Level 2
        </label>


        <Select
          style={{ width: '100%', }}
          value={questionsDataAi.level2}
          onChange={e => setQuestionsDataAi({ ...questionsDataAi, level2: e })}
        >
          <Option value="Beginners">Beginners</Option>
          <Option value="Intermediate">Intermediate</Option>
          <Option value="Advance">Advance</Option>
        </Select>
      </div>
    </>
  )
}

export default QuestionInfoAI