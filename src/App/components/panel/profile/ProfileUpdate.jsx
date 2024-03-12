import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useAuth } from '../../../../context/authContext';
import Heading from '../../common/Heading';
import { _useCommon } from '../../../../actions/_common';

const ProfileUpdate = () => {
  const [auth] = useAuth();
  const [form] = Form.useForm();
  const { loading, updatePassword } = _useCommon();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      updatePassword(values.currentPassword, values.newPassword);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };


  return (
    <div className="mt-3 p-2">
      <Heading title={auth?.user?.name} Icon={<UserOutlined className="its-icon" />} />
      <div className="mb-5">
        <label htmlFor="title" className="form-label _db-900">
          <h6>Email</h6>
        </label>
        <Input readOnly id="title" name="title" value={auth?.user?.email} />
      </div>

      <Form
        form={form}
        name="passwordUpdateForm"
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          currentPassword: '',
          newPassword: '',
          newConfirmPassword: '',
        }}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[{ required: true, message: 'Please input your current password!' }]}
        >
          <Input.Password placeholder="Current Password" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>

        <Form.Item
          name="newConfirmPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={loading} className='myBtn' icon={<LockOutlined />}>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileUpdate;
