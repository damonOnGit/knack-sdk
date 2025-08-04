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
export class KnackApiClient extends ApiClient {
  /**
   * Creates a new instance of the KnackApiClient.
   * @param config The configuration for the KnackApiClient.
   */
  constructor(config: KnackApiClientConfig) {
    super({
      ...config,
      apiBaseUrl: config.apiBaseUrl || 'https://api.knack.com/v1',
    });

    // Add Knack-specific headers
    (this as any).axiosInstance.defaults.headers['X-Knack-Application-Id'] = config.applicationId;
    (this as any).axiosInstance.defaults.headers['X-Knack-REST-API-Key'] = config.apiKey;
  }

  /**
   * Gets all records for a specific object.
   * @param objectKey The key of the object to get records for.
   * @param options The options for sorting, pagination, and filtering.
   * @returns A promise that resolves with the records.
   */
  public async getRecords<T>(
    objectKey: string,
    options?: SortOptions & PaginationOptions & { filters?: FilterOptions }
  ): Promise<T> {
    const params = { ...options };
    if (params.filters) {
      (params as any).filters = JSON.stringify(params.filters);
    }
    return this.get<T>(`/objects/${objectKey}/records`, { params });
  }

  /**
   * Gets a single record by its ID.
   * @param objectKey The key of the object to get the record from.
   * @param recordId The ID of the record to get.
   * @returns A promise that resolves with the record.
   */
  public async getRecord<T>(objectKey: string, recordId: string): Promise<T> {
    return this.get<T>(`/objects/${objectKey}/records/${recordId}`);
  }

  /**
   * Creates a new record for a specific object.
   * @param objectKey The key of the object to create the record for.
   * @param record The record to create.
   * @returns A promise that resolves with the created record.
   */
  public async createRecord<T>(objectKey: string, record: any): Promise<T> {
    return this.post<T>(`/objects/${objectKey}/records`, record);
  }

  /**
   * Updates an existing record for a specific object.
   * @param objectKey The key of the object to update the record for.
   * @param recordId The ID of the record to update.
   * @param record The updated record data.
   * @returns A promise that resolves with the updated record.
   */
  public async updateRecord<T>(objectKey: string, recordId: string, record: any): Promise<T> {
    return this.put<T>(`/objects/${objectKey}/records/${recordId}`, record);
  }

  /**
   * Deletes an existing record for a specific object.
   * @param objectKey The key of the object to delete the record from.
   * @param recordId The ID of the record to delete.
   * @returns A promise that resolves when the record is deleted.
   */
  public async deleteRecord<T>(objectKey: string, recordId: string): Promise<T> {
    return this.delete<T>(`/objects/${objectKey}/records/${recordId}`);
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
  constructor(config: KnackViewClientConfig) {
    super({
      ...config,
      apiKey: '', // Not used for view-based requests
      apiBaseUrl: config.apiBaseUrl || 'https://api.knack.com/v1',
    });

    // Add Knack-specific headers for view-based requests
    (this as any).axiosInstance.defaults.headers['X-Knack-Application-Id'] = config.applicationId;
    (this as any).axiosInstance.defaults.headers['Authorization'] = config.token;
  }

  /**
   * Gets all records from a specific view.
   * @param sceneKey The key of the scene the view is in.
   * @param viewKey The key of the view to get records from.
   * @param options The options for sorting, pagination, and filtering.
   * @returns A promise that resolves with the records.
   */
  public async getRecords<T>(
    sceneKey: string,
    viewKey: string,
    options?: SortOptions & PaginationOptions & { filters?: FilterOptions }
  ): Promise<T> {
    const params = { ...options };
    if (params.filters) {
      (params as any).filters = JSON.stringify(params.filters);
    }
    return this.get<T>(`/pages/${sceneKey}/views/${viewKey}/records`, { params });
  }

  /**
   * Gets a single record by its ID from a specific view.
   * @param sceneKey The key of the scene the view is in.
   * @param viewKey The key of the view to get the record from.
   * @param recordId The ID of the record to get.
   * @returns A promise that resolves with the record.
   */
  public async getRecord<T>(sceneKey: string, viewKey: string, recordId: string): Promise<T> {
    return this.get<T>(`/pages/${sceneKey}/views/${viewKey}/records/${recordId}`);
  }

  /**
   * Creates a new record in a specific view.
   * @param sceneKey The key of the scene the view is in.
   * @param viewKey The key of the view to create the record in.
   * @param record The record to create.
   * @returns A promise that resolves with the created record.
   */
  public async createRecord<T>(sceneKey: string, viewKey: string, record: any): Promise<T> {
    return this.post<T>(`/pages/${sceneKey}/views/${viewKey}/records`, record);
  }

  /**
   * Updates an existing record in a specific view.
   * @param sceneKey The key of the scene the view is in.
   * @param viewKey The key of the view to update the record in.
   * @param recordId The ID of the record to update.
   * @param record The updated record data.
   * @returns A promise that resolves with the updated record.
   */
  public async updateRecord<T>(sceneKey: string, viewKey: string, recordId: string, record: any): Promise<T> {
    return this.put<T>(`/pages/${sceneKey}/views/${viewKey}/records/${recordId}`, record);
  }

  /**
   * Deletes an existing record from a specific view.
   * @param sceneKey The key of the scene the view is in.
   * @param viewKey The key of the view to delete the record from.
   * @param recordId The ID of the record to delete.
   * @returns A promise that resolves when the record is deleted.
   */
  public async deleteRecord<T>(sceneKey: string, viewKey: string, recordId: string): Promise<T> {
    return this.delete<T>(`/pages/${sceneKey}/views/${viewKey}/records/${recordId}`);
  }
}
