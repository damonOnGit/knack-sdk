import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';

export interface ApiClientConfig {
  baseURL?: string;
  apiKey: string;
}

export class ApiClient {
  protected axiosInstance: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL || API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(path, config);
    return response.data;
  }

  public async post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(path, data, config);
    return response.data;
  }

  public async put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(path, data, config);
    return response.data;
  }

  public async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(path, config);
    return response.data;
  }
}
