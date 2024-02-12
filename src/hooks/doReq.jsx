import axios from "axios";
import { useState } from "react";

const doReq = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const doRequest = async ({ method, url, body, }) => {
    setLoading(true);

    try {
      const res = await axios[method](url, body, { withCredentials: true });
      return res;
    } catch (error) {
      console.log(error);
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {error.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    doRequest,
    errors,
  };
};

export default doReq;
