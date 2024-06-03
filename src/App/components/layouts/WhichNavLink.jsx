import { useParams } from "react-router-dom";
import { AimOutlined, AppstoreOutlined, DiffOutlined, LogoutOutlined, OrderedListOutlined, ProfileOutlined, QuestionOutlined, SettingOutlined, FileAddOutlined, StarOutlined, FileSearchOutlined } from "@ant-design/icons";


const WhichNavLink = ({ from }) => {
  const { id } = useParams();


  const QuizMenuList = [
    {
      gap: false,
      name: "Attempt Dashboard",
      path: `/subscribe/quizzes/attempt/${id}`,
      Icon: <AppstoreOutlined />,
    },
    {
      gap: false,
      name: "Quiz",
      path: `/subscribe/quizzes/${id}`,
      Icon: <OrderedListOutlined />,
    },

    {
      gap: false,
      name: "Questions",
      path: `/subscribe/questions/${id}`,
      Icon: <QuestionOutlined />,
    },

    {
      gap: false,
      name: "Attempt Users",
      path: `/subscribe/quizzes/${id}/attempters`,
      Icon: <OrderedListOutlined />,
    },

    {
      gap: true,
      name: "Exit",
      path: "/subscribe/quizzes",
      Icon: <LogoutOutlined />,
    },
  ];

  const menuList = [
    {
      gap: false,
      name: "Dashboard",
      path: "/subscribe",
      Icon: <AppstoreOutlined />,
    },
    {
      gap: true,
      name: "Quizzes",
      path: "/subscribe/quizzes",
      Icon: <OrderedListOutlined />,
    },
    {
      gap: false,
      name: "Create Quiz",
      path: "/subscribe/create-quiz",
      Icon: <DiffOutlined />,
    },
    {
      gap: false,
      name: "Create Quiz With AI",
      path: "/subscribe/create-quiz-ai",
      Icon: <AimOutlined />,
    },
    {
      gap: false,
      name: "Global Settings",
      path: "/subscribe/global-settings",
      Icon: <SettingOutlined />,
    },

    {
      gap: true,
      name: "Surveys",
      path: '/subscribe/surveys',
      Icon: <FileSearchOutlined />,
    },
    {
      gap: false,
      name: "Create Survey",
      path: "/subscribe/create-survey",
      Icon: <FileAddOutlined />,
    },



    {
      gap: true,
      name: "Create Home Page",
      path: '/subscribe/my-home',
      Icon: <StarOutlined />,
    },

    {
      gap: true,
      name: "Profile",
      path: "/subscribe/profile",
      Icon: <ProfileOutlined />,
    },
    // {
    //   gap: false,
    //   name: "Make a request",
    //   path: "/subscribe/create/ticket",
    //   Icon: <SnippetsOutlined />,
    // },
  ];

  return from === "subscriber" ? menuList : QuizMenuList
}

export default WhichNavLink