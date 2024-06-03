import { FloatButton } from "antd"
import { useState } from "react";
import { ImMagicWand } from "react-icons/im";
import HomeEditor from "../../components/panel/home-page/HomeEditor";
import Nothing from "../../components/panel/home-page/Nothing";
import Header from "../../components/panel/home-page/Header";
import Banner from "../../components/panel/home-page/Banner";
import { useEditHomePage } from "../../../actions/_homePage";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import QuizSection from "../../components/panel/home-page/QuizSection";
import FooterSection from "../../components/panel/home-page/FooterSection";



const DetailHomePage = () => {

  const { slug } = useParams()

  const { values, setValues, edit, isLoading, fetchingLoading } = useEditHomePage(slug)

  const {
    showHeader,
    header: {
      gap,
      justify,
      container,
      bgColor,
      textColor,
      instagram,
      facebook,
      twitter,
      linkedin,
      showSocialLinks,
      socialLinksGap,
    },
    showBanner,
    banner: {
      height,
      bannerBgColor,
      bannerTextColor,
      border,
      borderRadius,
      bannerContainer,
      text,
      para,
    }


  } = values;

  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>

      {!showBanner && !showHeader && "noe"}


      {
        fetchingLoading ? <LoadingOutlined size={40} /> :
          !showBanner && !showBanner && <Nothing />
      }


      {showHeader &&
        <Header
          justify={justify}
          gap={gap}
          container={container}
          bgColor={bgColor}
          textColor={textColor}
          instagram={instagram}
          facebook={facebook}
          twitter={twitter}
          linkedin={linkedin}
          showSocialLinks={showSocialLinks}
          socialLinksGap={socialLinksGap}
        />
      }

      {showBanner &&
        <Banner
          height={height}
          bannerBgColor={bannerBgColor}
          bannerTextColor={bannerTextColor}
          border={border}
          borderRadius={borderRadius}
          bannerContainer={bannerContainer}
          text={text}
          para={para}
        />
      }



      {
        values?.quizzes.length > 0 && <QuizSection values={values} />
      }


      <FooterSection
        container={container || "container"}
        bgColor={bgColor || "black"}
        textColor={textColor || "white"}
      />








      <FloatButton
        icon={<ImMagicWand color="white" />}
        tooltip={<div>Customize Your Home Page</div>} onClick={() => setOpenDrawer(true)}
      />

      <HomeEditor
        isLoading={isLoading}
        submit={edit}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        values={values}
        setValues={setValues}
      />

    </>
  )
}

export default DetailHomePage