import { ApiClient, type ApiClientConfig } from './base-client.js';
/**
 * Represents the configuration for the KnackApiClient.
 */
export interface KnackApiClientConfig extends ApiClientConfig {
    applicationId: string;
    apiKey: string;
    apiBaseUrl?: string;
}
/**
 * Represents the configuration for the KnackViewClient.
 */
export interface KnackViewClientConfig {
    applicationId: string;
    token: string;
    apiBaseUrl?: string;
}
/**
 * Represents the options for sorting records.
 */
export interface SortOptions {
    sort_field: string;
    sort_order: 'asc' | 'desc';
}
/**
 * Represents the options for paginating records.
 */
export interface PaginationOptions {
    rows_per_page: number;
    page: number;
}
/**
 * Represents a filter rule.
 */
export interface FilterRule {
    field: string;
    operator: string;
    value: any;
}
/**
 * Represents the options for filtering records.
 */
export interface FilterOptions {
    match: 'and' | 'or';
    rules: FilterRule[];
}
/**
 * A client for interacting with the Knack API using object-based requests.
 */
export declare class KnackApiClient extends ApiClient {
    /**
     * Creates a new instance of the KnackApiClient.
     * @param config The configuration for the KnackApiClient.
     */
    constructor(config: KnackApiClientConfig);
    /**
     * Gets all records for a specific object.
     * @param objectKey The key of the object to get records for.
     * @param options The options for sorting, pagination, and filtering.
     * @returns A promise that resolves with the records.
     */
    getRecords<T>(objectKey: string, options?: SortOptions & PaginationOptions & {
        filters?: FilterOptions;
    }): Promise<T>;
    /**
     * Gets a single record by its ID.
     * @param objectKey The key of the object to get the record from.
     * @param recordId The ID of the record to get.
     * @returns A promise that resolves with the record.
     */
    getRecord<T>(objectKey: string, recordId: string): Promise<T>;
    /**
     * Creates a new record for a specific object.
     * @param objectKey The key of the object to create the record for.
     * @param record The record to create.
     * @returns A promise that resolves with the created record.
     */
    createRecord<T>(objectKey: string, record: any): Promise<T>;
    /**
     * Updates an existing record for a specific object.
     * @param objectKey The key of the object to update the record for.
     * @param recordId The ID of the record to update.
     * @param record The updated record data.
     * @returns A promise that resolves with the updated record.
     */
    updateRecord<T>(objectKey: string, recordId: string, record: any): Promise<T>;
    /**
     * Deletes an existing record for a specific object.
     * @param objectKey The key of the object to delete the record from.
     * @param recordId The ID of the record to delete.
     * @returns A promise that resolves when the record is deleted.
     */
    deleteRecord<T>(objectKey: string, recordId: string): Promise<T>;
}
/**
 * A client for interacting with the Knack API using view-based requests.
 */
export declare class KnackViewClient extends ApiClient {
    /**
     * Creates a new instance of the KnackViewClient.
     * @param config The configuration for the KnackViewClient.
     */
    constructor(config: KnackViewClientConfig);
    /**
     * Gets all records from a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to get records from.
     * @param options The options for sorting, pagination, and filtering.
     * @returns A promise that resolves with the records.
     */
    getRecords<T>(sceneKey: string, viewKey: string, options?: SortOptions & PaginationOptions & {
        filters?: FilterOptions;
    }): Promise<T>;
    /**
     * Gets a single record by its ID from a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to get the record from.
     * @param recordId The ID of the record to get.
     * @returns A promise that resolves with the record.
     */
    getRecord<T>(sceneKey: string, viewKey: string, recordId: string): Promise<T>;
    /**
     * Creates a new record in a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to create the record in.
     * @param record The record to create.
     * @returns A promise that resolves with the created record.
     */
    createRecord<T>(sceneKey: string, viewKey: string, record: any): Promise<T>;
    /**
     * Updates an existing record in a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to update the record in.
     * @param recordId The ID of the record to update.
     * @param record The updated record data.
     * @returns A promise that resolves with the updated record.
     */
    updateRecord<T>(sceneKey: string, viewKey: string, recordId: string, record: any): Promise<T>;
    /**
     * Deletes an existing record from a specific view.
     * @param sceneKey The key of the scene the view is in.
     * @param viewKey The key of the view to delete the record from.
     * @param recordId The ID of the record to delete.
     * @returns A promise that resolves when the record is deleted.
     */
    deleteRecord<T>(sceneKey: string, viewKey: string, recordId: string): Promise<T>;
}
