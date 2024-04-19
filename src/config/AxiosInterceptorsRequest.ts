export default function AxiosInterceptorsRequest(api: any, token?: any) {
  api.interceptors.request.use(
    async (config: any) => {
      const token = localStorage.getItem("@sipavAccessToken");

      if (token) {
        config.headers = {
          Authorization: `Token ${token}`,
        };
      }
      return config;
    },
    (error: any) => {
      Promise.reject(error);
    }
  );
}
