import { Tour } from "antd"

const QuizDetailTour = ({ open, setOpen, ref1, ref2, ref3 }) => {

  const steps = [
    {
      title: 'Quiz Edit',
      description: 'From this section, You can edit quiz (e:g. Title, Required Fields, Number Attempts, TimeLimit).',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Questions',
      description: 'From this section, You can reorder Question Position, Delete Question, Edit Question, Add Questions .',
      target: () => ref2.current,
      mask: {
        style: {
          boxShadow: 'inset 0 0 15px #fff',
        },
        color: 'rgba(40, 0, 255, .4)',
      },
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
      mask: false,
    },
  ];


  return (
    <Tour
      open={open}
      onClose={() => setOpen(false)}
      steps={steps}
      mask={{
        style: {
          boxShadow: 'inset 0 0 15px #333',
        },
        color: 'rgba(80, 255, 255, .4)',
      }}
    />
  )
}

export default QuizDetailTour