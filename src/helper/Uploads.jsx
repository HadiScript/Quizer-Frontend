import React, { useState } from 'react';
import { Upload, Button, message, Flex } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useAuth } from '../context/authContext';
import { API } from './API';
import axios from 'axios';
const { Dragger } = Upload;


const DraggableUploader = ({ slug, preImage, cover = true }) => {
  const [auth] = useAuth();
  const DeleteUrl = cover ? `${API}/api/uploads/survey/delete-cover/${slug}` : `${API}/api/uploads/survey/delete-template/${slug}`
  const UploadUrl = cover ? `${API}/api/uploads/survey/upload-cover/${slug}` : `${API}/api/uploads/survey/upload-template/${slug}`



  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [previousImage, setPreviousImage] = useState(preImage ? preImage : null)

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(UploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${auth.token}`, // Assuming token-based auth
        },
      });

      if (!response.ok) throw new Error('Upload failed');
      message.success(`${file.name} file uploaded successfully. ${cover ? "Cover" : "Tamplete"}`);
      setUploaded(true);
    } catch (error) {
      message.error(`Upload failed: ${error.message}`);
    }
  };



  const handleDelete = async () => {
    try {
      const response = await axios.delete(DeleteUrl)
      if (response.status === 200) {
        message.success('Image deleted successfully');
        setPreviewUrl(null);
        setUploaded(false);
        setPreviousImage(null)
      } else {
        message.error('Failed to delete image');
      }
    } catch (error) {
      console.log(error)
      message.error('Error deleting image');
    }
  };

  const props = {
    name: 'file',
    multiple: false,
    action: '#',
    onChange: () => { }, // Make onChange effectively a no-op
    beforeUpload(file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreviewUrl(e.target.result);
        setFile(file);
      };
      fileReader.readAsDataURL(file);
      // Prevent automatic upload
      return false;
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div className='row gap-2'>

      {
        previousImage && !previewUrl &&
        <div className="col-12 col-md-5">
          <div className='d-flex gap-2 flex-column mb-2'>
            <img src={previousImage} alt="Preview" style={{ width: '50%', height: cover ? "150px" : "300px", marginTop: '20px', borderRadius: "10px" }} />
            <span className='text-danger' role='button' onClick={handleDelete}>Delete Cover Image</span>
          </div>
        </div>
      }

      {previewUrl && (
        <div className="col-12 col-md-5">
          <div className='d-flex gap-2 flex-column my-2'>
            <img src={previewUrl} alt="Preview"
              style={{
                width: '100%',
                height: cover ? "150px" : "300px",
                marginTop: '20px',
                borderRadius: "10px"
              }}
            />
            {!uploaded && <Button  className='mt-3 myBtn' onClick={handleUpload}>Upload Image</Button>}
            {uploaded && <Button  className='mt-3 myBtn' onClick={handleDelete}>Delete Image</Button>}
          </div>
        </div>
      )}
      {!uploaded && !previousImage && (
        <div className="col-12 col-md-6">
          <div className="" style={{ height: "180px", width: '100%%' }}>
            <Dragger {...props} >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single upload. Strictly prohibited from uploading company data or other
                banned files.
              </p>
            </Dragger>
          </div>
        </div>
      )}


    </div>
  );
};

export default DraggableUploader;