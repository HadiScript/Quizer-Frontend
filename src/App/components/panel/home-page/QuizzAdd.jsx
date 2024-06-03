import { Form, Input, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const QuizzAdd = ({ values, setValues, data, loading }) => {



  const getQuizIds = (quizzes) => {
    return quizzes?.map(quiz => quiz._id);
  }

  // Function to find quizzes by their IDs
  const findQuizzesByIds = (ids) => {
    return data.filter(quiz => ids.includes(quiz._id));
  }

  // This function handles changes in the Select component.
  const handleChange = (selectedIds) => {
    // Find the quizzes from the main data array that match the selected IDs
    const selectedQuizzes = findQuizzesByIds(selectedIds);
    // Update the state with these quizzes
    setValues(prev => ({
      ...prev,
      quizzes: selectedQuizzes
    }));
  }

  return (
    <>
      {loading && <LoadingOutlined />}

      <Form.Item label="Section Title" valuePropName="checked">
        <Input
          value={values?.quizSection?.title}
          onChange={(e) => setValues(prev => ({ ...prev, quizSection: { ...prev.quizSection, title: e.target.value } }))}
        />
      </Form.Item>


      <Form.Item label="Section Description" valuePropName="checked">
        <Input.TextArea
          value={values?.quizSection?.description}
          onChange={(e) => setValues(prev => ({ ...prev, quizSection: { ...prev.quizSection, description: e.target.value } }))}
        />
      </Form.Item>

      <Form.Item label="Choose quizzes" className='mt-2'>
        <Select
          mode="multiple"
          value={values?.quizzes ? getQuizIds(values.quizzes) : []}
          onChange={handleChange}
        >
          {data?.map((quiz) => (
            <Select.Option key={quiz._id} value={quiz._id}>{quiz.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>





    </>
  )
}

export default QuizzAdd