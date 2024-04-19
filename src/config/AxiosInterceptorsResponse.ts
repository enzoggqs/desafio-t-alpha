import { toast } from "react-toastify";

const statusCodeBadRequest = 400;

export default function AxiosInterceptorsResponse(api: any) {
  api.interceptors.response.use(
    (response: any) => {
      toast.success(response.message);
      return response;
    },
    (error: any) => {
      console.dir(
        "🚀 ~ file: AxiosInterceptorsResponse.js ~ line 12 ~ AxiosInterceptorsResponse ~ error",
        error
      );
      const { response } = error;
      toast.error(response?.data?.message);

      if (response?.status === statusCodeBadRequest) {
        toast.error(response?.data[0]?.message);
      }
      return Promise.reject(error);
    }
  );
}
