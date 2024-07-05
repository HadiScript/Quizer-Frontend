import { ImFacebook, ImInstagram, ImLinkedin, ImTwitter } from "react-icons/im"

const Header = ({
  justify,
  gap,
  container,
  bgColor,
  textColor,
  instagram,
  facebook,
  twitter,
  linkedin,
  showSocialLinks,
  socialLinksGap,
}) => {
  return (
    <div className="border-bottom" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className={`${container && 'container'} d-flex justify-content-${justify} align-items-center gap-${gap}  py-3`}>
        <h5>Logo</h5>
        {showSocialLinks && <div className={`d-flex justify-content-center gap-${socialLinksGap} align-items-center`}>

          {instagram?.show && <a style={{ color: textColor }} href={instagram?.link} target="_blank"> <ImInstagram /></a>}
          {facebook?.show && <a style={{ color: textColor }} href={facebook?.link} target="_blank"> <ImFacebook /></a>}
          {twitter?.show && <a style={{ color: textColor }} href={twitter?.link} target="_blank"> <ImTwitter /></a>}
          {linkedin?.show && <a style={{ color: textColor }} href={linkedin?.link} target="_blank"> <ImLinkedin /></a>}
        </div>}
      </div>
    </div>

  )
}

export default Header