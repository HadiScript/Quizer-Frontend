import { Button, Upload } from "antd";
import Logo from "../layouts/Logo";
import { useAuth } from "../../../context/authContext";


const { Dragger } = Upload

const LogoUploads = (
  { image, handleChange, preview, uploadImage, removeLogo }
) => {
  const [auth] = useAuth()


  return (
    <div className="mb-3 d-flex flex-column ">
      {auth?.user?.logo ?
        <div className="d-flex flex-column  gap-3">
          <Logo from="settings" />
          <Button onClick={removeLogo}>Delete Logo</Button>
        </div>
        : !image && !auth?.user?.logo ?
          <>
            <Dragger
              multiple={false}
              onChange={handleChange}
              beforeUpload={
                (file) => {
                  const isPNG = file.type === 'image/png';
                  if (!isPNG) {
                    message.error(`${file.name} is not a png file`);
                  }
                }
              }
              showUploadList={false}
            >
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </>
          : <>
            <img src={preview} style={{ width: '100px', height: "50px" }} />
            <Button onClick={uploadImage}>Upload</Button>
          </>
      }





    </div>

  )
}

export default LogoUploads