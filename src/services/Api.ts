import axios from "axios";
import axiosInterceptorsResponse from "../config/AxiosInterceptorsResponse";
import axiosInterceptorsRequest from "../config/AxiosInterceptorsRequest";

const api = axios.create({
  baseURL: "https://interview.t-alpha.com.br/",
});

axiosInterceptorsRequest(api);
axiosInterceptorsResponse(api);

export default api;
