export const _quizData = {
  _id: "658d5fb6259d7cd4a76ea138",
  title: "What is Lorem Ipsum?",
  timeLimit: 5,
  questions: [
    {
      _id: "6592bbc531c749910f21f685",
      text: "What is ReactJs?",
      type: "multiple-choice",
      options: [
        { text: "Javascript Framework" },
        { text: "Javascript Package" },
        { text: "Javascript Libraray" },
        { text: "Library to build UI within Javascript" },
      ],
    },
    {
      _id: "6592bbef31c749910f21f693",
      text: "NPM is?",
      type: "multiple-choice",
      options: [{ text: "Node Enviroment" }, { text: "Node Package Manager" }],
    },
    {
      _id: "6592bc1431c749910f21f69d",
      text: "NodeJs provides run-time envirment for the backend.",
      type: "multiple-choice",
      options: [{ text: "True" }, { text: "False" }],
    },
    {
      _id: "6592bc6c31c749910f21f6c5",
      text: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.\n\n\n const { creatorId, quizId, attemptId } = useParams();\n const [quizData, setQuizData] = useState({});\n\n useEffect(() => {\n const handleBeforeUnload = (event) => {\n event.returnValue = "Are you sure you want to leave?";\n return "Are you sure you want to leave?";\n };\n window.addEventListener("beforeunload", handleBeforeUnload);\n return () => {\n window.removeEventListener("beforeunload", handleBeforeUnload);\n };\n }, []);\n',
      type: "multiple-choice",
      options: [
        { text: " const { creatorId, quizId, attemptId } = useParams();" },
        { text: " const { creatorId, quizId, attemptId } = useLocation();" },
      ],
    },
  ],
};
