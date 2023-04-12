import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import { BASE_URL } from "../config/app.config";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "cache-control": "no-cache",
  },
});

export const axiosBaseQuery =
  (
    { baseUrl } = { baseUrl: "" }
  ): BaseQueryFn<{
    url: string;
    method?: string;
    data?: any;
    params?: any;
  }> =>
  async ({ url = "", method, data, params }, { signal }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        signal,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err: any = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
