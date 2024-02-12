import { AppstoreOutlined, DiffOutlined, LogoutOutlined, OrderedListOutlined, ProfileOutlined, QuestionOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useParams } from "react-router-dom";
import useActive from "../../../hooks/useActive";
import { _useCommon } from "../../../actions/_common";

const menuList = [
  {
    gap: false,
    name: "Dashboard",
    path: "/subscribe",
    Icon: <AppstoreOutlined />,
  },
  {
    gap: true,
    name: "Quizes",
    path: "/subscribe/quizes",
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
    name: "Global Settings",
    path: "/subscribe/global-settings",
    Icon: <SettingOutlined />,
  },
  {
    gap: true,
    name: "Profile",
    path: "/subscribe/profile",
    Icon: <ProfileOutlined />,
  },
  {
    gap: false,
    name: "Settings",
    path: "/subscribe/settings",
    Icon: <SettingOutlined />,
  },
];

const LeftCol = ({ from = "notSubscriber" }) => {
  const { id } = useParams();
  const { isActive } = useActive();
  const { logout } = _useCommon();

  const QuizMenuList = [
    {
      gap: false,
      name: "Attempt Dashboard",
      path: `/subscribe/quize/attempt/${id}`,
      Icon: <AppstoreOutlined />,
    },
    {
      gap: false,
      name: "Quiz",
      path: `/subscribe/quize/${id}`,
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
      path: `/subscribe/quize/${id}/attempters`,
      Icon: <OrderedListOutlined />,
    },

    {
      gap: true,
      name: "Exit",
      path: "/subscribe/quizes",
      Icon: <SettingOutlined />,
    },
  ];

  return (
    <>
      <div className={"text-start px-3 mt-3 mb-4"}>
        <h4>HadiScript</h4>
      </div>
      <div className="py-1 ">
        <Menu>
          {from == "subscriber"
            ? menuList.map((x, index) => (
                <Menu.Item
                  key={index}
                  className={`${x.gap ? "mt-4" : "mt-1"} ${isActive(x.path)}`}
                  icon={
                    <Link className="_link its-icon" to={x.path}>
                      {x.Icon}
                    </Link>
                  }
                >
                  <Link className="_link" to={x.path}>
                    {x.name}
                  </Link>
                </Menu.Item>
              ))
            : QuizMenuList.map((x, index) => (
                <Menu.Item
                  key={index}
                  className={`${x.gap ? "mt-4" : "mt-1"} ${isActive(x.path)}`}
                  icon={
                    <Link className="_link its-icon" to={x.path}>
                      {x.Icon}
                    </Link>
                  }
                >
                  <Link className="_link" to={x.path}>
                    {x.name}
                  </Link>
                </Menu.Item>
              ))}

          {from === "subscriber" && (
            <Menu.Item
              key="99"
              className="mt-4 nav-link"
              onClick={logout}
              icon={
                <div className="its-icon">
                  <LogoutOutlined />
                </div>
              }
            >
              <span> Logout</span>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default LeftCol;
