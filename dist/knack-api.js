var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiClient } from './base-client.js';
/**
 * A client for interacting with the Knack API using object-based requests.
 */
export class KnackApiClient extends ApiClient {
    /**
     * Creates a new instance of the KnackApiClient.
     * @param config The configuration for the KnackApiClient.
     */
    constructor(config) {
        super(Object.assign(Object.assign({}, config), { apiBaseUrl: config.apiBaseUrl || 'https://api.knack.com/v1' }));
        // Add Knack-specific headers
        this.axiosInstance.defaults.headers['X-Knack-Application-Id'] = config.applicationId;
        this.axiosInstance.defaults.headers['X-Knack-REST-API-Key'] = config.apiKey;
    }
    /**
     * Gets all records for a specific object.
     * @param objectKey The key of the object to get records for.
     * @param options The options for sorting, pagination, and filtering.
     * @returns A promise that resolves with the records.
     */
    getRecords(objectKey, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign({}, options);
            if (params.filters) {
                params.filters = JSON.stringify(params.filters);
            }
            return this.get(`/objects/${objectKey}/records`, { params });
        });
    }
    /**
     * Gets a single record by its ID.
     * @param objectKey The key of the object to get the record from.
     * @param recordId The ID of the record to get.
     * @returns A promise that resolves with the record.
     */
    getRecord(objectKey, recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/objects/${objectKey}/records/${recordId}`);
        });
    }
    /**
     * Creates a new record for a specific object.
     * @param objectKey The key of the object to create the record for.
     * @param record The record to create.
     * @returns A promise that resolves with the created record.
     */
    createRecord(objectKey, record) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(`/objects/${objectKey}/records`, record);
        });
    }
    /**
     * Updates an existing record for a specific object.
     * @param objectKey The key of the object to update the record for.
     * @param recordId The ID of the record to update.
     * @param record The updated record data.
     * @returns A promise that resolves with the updated record.
     */
    updateRecord(objectKey, recordId, record) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/objects/${objectKey}/records/${recordId}`, record);
        });
    }
    /**
     * Deletes an existing record for a specific object.
     * @param objectKey The key of the object to delete the record from.
     * @param recordId The ID of the record to delete.
     * @returns A promise that resolves when the record is deleted.
     */
    deleteRecord(objectKey, recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/objects/${objectKey}/records/${recordId}`);
        });
    }
}
/**
 * A client for interacting with the Knack API using view-based requests.
 */
export class KnackViewClient extends ApiClient {
    /**
     * Creates a new instance of the KnackViewClient.
     * @param config The configuration for the KnackViewClient.
     */
    constructor(config) {
        super(Object.assign(Object.assign({}, config), { apiKey: '', apiBaseUrl: config.apiBaseUrl || 'https://api.knack.com/v1' }));
        // Add Knack-specific headers for view-based requests
        this.axiosInstance.defaults.headers['X-Knack-Application-Id'] = config.applicationId;
        this.axiosInstance.defaults.headers['Authorization'] = config.token;
    }
    /**
     * Gets all records from a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to get records from.
     * @param options The options for sorting, pagination, and filtering.
     * @returns A promise that resolves with the records.
     */
    getRecords(sceneKey, viewKey, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign({}, options);
            if (params.filters) {
                params.filters = JSON.stringify(params.filters);
            }
            return this.get(`/pages/${sceneKey}/views/${viewKey}/records`, { params });
        });
    }
    /**
     * Gets a single record by its ID from a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to get the record from.
     * @param recordId The ID of the record to get.
     * @returns A promise that resolves with the record.
     */
    getRecord(sceneKey, viewKey, recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/pages/${sceneKey}/views/${viewKey}/records/${recordId}`);
        });
    }
    /**
     * Creates a new record in a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to create the record in.
     * @param record The record to create.
     * @returns A promise that resolves with the created record.
     */
    createRecord(sceneKey, viewKey, record) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(`/pages/${sceneKey}/views/${viewKey}/records`, record);
        });
    }
    /**
     * Updates an existing record in a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to update the record in.
     * @param recordId The ID of the record to update.
     * @param record The updated record data.
     * @returns A promise that resolves with the updated record.
     */
    updateRecord(sceneKey, viewKey, recordId, record) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/pages/${sceneKey}/views/${viewKey}/records/${recordId}`, record);
        });
    }
    /**
     * Deletes an existing record from a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to delete the record from.
     * @param recordId The ID of the record to delete.
     * @returns A promise that resolves when the record is deleted.
     */
    deleteRecord(sceneKey, viewKey, recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/pages/${sceneKey}/views/${viewKey}/records/${recordId}`);
        });
    }
}
