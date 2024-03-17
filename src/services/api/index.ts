import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_SOURCE, TIMEOUT_API } from "src/constants";
import { TApiParams, TResponse } from "src/services/api/types";

export class ApiService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      validateStatus: (status) => status >= 200 && status < 400,
      baseURL: API_SOURCE,
      timeout: TIMEOUT_API
    });
  }

  readonly get = <T, P = TApiParams>(
    path: string,
    params?: P,
    config?: AxiosRequestConfig
  ): TResponse<T> => this.axios.get<T>(path, { ...config, params });

  readonly post = <T, D>(
    path: string,
    data: D,
    config?: AxiosRequestConfig
  ): TResponse<T> => this.axios.post(path, data, config);

  readonly put = <T, D>(path: string, data: D): TResponse<T> =>
    this.axios.put(path, data);

  readonly delete = <T>(path: string): TResponse<T> => this.axios.delete(path);

  readonly patch = <T, D>(path: string, data: D): TResponse<T> =>
    this.axios.patch(path, data);

  readonly sse = (path: string): EventSource =>
    new EventSource(`${API_SOURCE}${path}`);
}

export const api = new ApiService();
