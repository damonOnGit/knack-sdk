import { jest } from '@jest/globals';
import { KnackApiClient, KnackViewClient } from '../src/knack-api';
import axios from 'axios';

describe('KnackApiClient', () => {
  let client: KnackApiClient;
  let mockAxiosInstance: {
    get: jest.Mock;
    post: jest.Mock;
    put: jest.Mock;
    delete: jest.Mock;
    defaults: { headers: { common: {} } };
  };

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      defaults: { headers: { common: {} } },
    };
    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance as any);

    client = new KnackApiClient({
      apiKey: 'test-api-key',
      applicationId: 'test-app-id',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  describe('getRecords', () => {
    it('should call the correct endpoint', async () => {
      const objectKey = 'object_1';
      const expectedUrl = `/objects/${objectKey}/records`;
      const mockData = { records: [] };

      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      await client.getRecords(objectKey);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(expectedUrl, { params: {} });
    });

    it('should call the correct endpoint with options', async () => {
      const objectKey = 'object_1';
      const expectedUrl = `/objects/${objectKey}/records`;
      const mockData = { records: [] };
      const options = {
        sort_field: 'field_1',
        sort_order: 'asc' as const,
        rows_per_page: 10,
        page: 1,
        filters: {
          match: 'and' as const,
          rules: [{ field: 'field_1', operator: 'is', value: 'test' }],
        },
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      await client.getRecords(objectKey, options);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(expectedUrl, {
        params: {
          ...options,
          filters: JSON.stringify(options.filters),
        },
      });
    });
  });

  describe('getRecord', () => {
    it('should call the correct endpoint', async () => {
      const objectKey = 'object_1';
      const recordId = '123';
      const expectedUrl = `/objects/${objectKey}/records/${recordId}`;
      const mockData = { id: recordId };

      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      await client.getRecord(objectKey, recordId);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(expectedUrl, undefined);
    });
  });

  describe('createRecord', () => {
    it('should call the correct endpoint with the correct data', async () => {
      const objectKey = 'object_1';
      const record = { field_1: 'test' };
      const expectedUrl = `/objects/${objectKey}/records`;
      const mockData = { id: '123', ...record };

      mockAxiosInstance.post.mockResolvedValue({ data: mockData });

      await client.createRecord(objectKey, record);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(expectedUrl, record, undefined);
    });
  });

  describe('updateRecord', () => {
    it('should call the correct endpoint with the correct data', async () => {
      const objectKey = 'object_1';
      const recordId = '123';
      const record = { field_1: 'test' };
      const expectedUrl = `/objects/${objectKey}/records/${recordId}`;
      const mockData = { id: recordId, ...record };

      mockAxiosInstance.put.mockResolvedValue({ data: mockData });

      await client.updateRecord(objectKey, recordId, record);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(expectedUrl, record, undefined);
    });
  });

  describe('deleteRecord', () => {
    it('should call the correct endpoint', async () => {
      const objectKey = 'object_1';
      const recordId = '123';
      const expectedUrl = `/objects/${objectKey}/records/${recordId}`;

      mockAxiosInstance.delete.mockResolvedValue({ data: {} });

      await client.deleteRecord(objectKey, recordId);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(expectedUrl, undefined);
    });
  });
});

describe('KnackViewClient', () => {
  let client: KnackViewClient;
  let mockAxiosInstance: {
    get: jest.Mock;
    post: jest.Mock;
    put: jest.Mock;
    delete: jest.Mock;
    defaults: { headers: { common: {} } };
  };

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      defaults: { headers: { common: {} } },
    };
    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance as any);

    client = new KnackViewClient({
      token: 'test-token',
      applicationId: 'test-app-id',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  describe('getRecords', () => {
    it('should call the correct endpoint', async () => {
      const sceneKey = 'scene_1';
      const viewKey = 'view_1';
      const expectedUrl = `/pages/${sceneKey}/views/${viewKey}/records`;
      const mockData = { records: [] };

      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      await client.getRecords(sceneKey, viewKey);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(expectedUrl, { params: {} });
    });

    it('should call the correct endpoint with options', async () => {
      const sceneKey = 'scene_1';
      const viewKey = 'view_1';
      const expectedUrl = `/pages/${sceneKey}/views/${viewKey}/records`;
      const mockData = { records: [] };
      const options = {
        sort_field: 'field_1',
        sort_order: 'asc' as const,
        rows_per_page: 10,
        page: 1,
        filters: {
          match: 'and' as const,
          rules: [{ field: 'field_1', operator: 'is', value: 'test' }],
        },
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      await client.getRecords(sceneKey, viewKey, options);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(expectedUrl, {
        params: {
          ...options,
          filters: JSON.stringify(options.filters),
        },
      });
    });
  });

  describe('getRecord', () => {
    it('should call the correct endpoint', async () => {
      const sceneKey = 'scene_1';
      const viewKey = 'view_1';
      const recordId = '123';
      const expectedUrl = `/pages/${sceneKey}/views/${viewKey}/records/${recordId}`;
      const mockData = { id: recordId };

      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      await client.getRecord(sceneKey, viewKey, recordId);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(expectedUrl, undefined);
    });
  });

  describe('createRecord', () => {
    it('should call the correct endpoint with the correct data', async () => {
      const sceneKey = 'scene_1';
      const viewKey = 'view_1';
      const record = { field_1: 'test' };
      const expectedUrl = `/pages/${sceneKey}/views/${viewKey}/records`;
      const mockData = { id: '123', ...record };

      mockAxiosInstance.post.mockResolvedValue({ data: mockData });

      await client.createRecord(sceneKey, viewKey, record);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(expectedUrl, record, undefined);
    });
  });

  describe('updateRecord', () => {
    it('should call the correct endpoint with the correct data', async () => {
      const sceneKey = 'scene_1';
      const viewKey = 'view_1';
      const recordId = '123';
      const record = { field_1: 'test' };
      const expectedUrl = `/pages/${sceneKey}/views/${viewKey}/records/${recordId}`;
      const mockData = { id: recordId, ...record };

      mockAxiosInstance.put.mockResolvedValue({ data: mockData });

      await client.updateRecord(sceneKey, viewKey, recordId, record);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(expectedUrl, record, undefined);
    });
  });

  describe('deleteRecord', () => {
    it('should call the correct endpoint', async () => {
      const sceneKey = 'scene_1';
      const viewKey = 'view_1';
      const recordId = '123';
      const expectedUrl = `/pages/${sceneKey}/views/${viewKey}/records/${recordId}`;

      mockAxiosInstance.delete.mockResolvedValue({ data: {} });

      await client.deleteRecord(sceneKey, viewKey, recordId);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(expectedUrl, undefined);
    });
  });
});
