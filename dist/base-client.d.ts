import type { AxiosInstance, AxiosRequestConfig } from 'axios';
export interface ApiClientConfig {
    apiBaseUrl?: string;
    apiKey: string;
}
export declare class ApiClient {
    protected axiosInstance: AxiosInstance;
    constructor(config: ApiClientConfig);
    get<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
}
