import toast from "react-hot-toast";

export const Errs = (err) => {
  if (err?.response?.data?.statusCode === 404) return toast.error("User not found");
  else if (err?.response?.data?.statusCode === 400) return toast.error(err?.response?.data?.message);
  else if (err?.response?.data?.statusCode === 401) return toast.error(err?.response?.data?.message);
};
