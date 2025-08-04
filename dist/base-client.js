var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
export class ApiClient {
    constructor(config) {
        this.axiosInstance = axios.create({
            baseURL: config.apiBaseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    get(path, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get(path, config);
            return response.data;
        });
    }
    post(path, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post(path, data, config);
            return response.data;
        });
    }
    put(path, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.put(path, data, config);
            return response.data;
        });
    }
    delete(path, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.delete(path, config);
            return response.data;
        });
    }
}
