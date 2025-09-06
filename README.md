# Knack TypeScript SDK

A TypeScript SDK for interacting with the Knack API. This SDK provides two clients for different authentication methods:

- **`KnackApiClient`**: For server-side applications using an API key for authentication.
- **`KnackViewClient`**: For client-side applications using a user token for view-based requests.

## Installation

```bash
npm install knack-ts-sdk
```

## `KnackApiClient` (for Server-Side Use)

This client is designed for server-side applications where you can securely store your API key. It provides direct access to your Knack objects.

### Usage

```typescript
import { KnackApiClient } from 'knack-ts-sdk';

const client = new KnackApiClient({
  apiKey: 'YOUR_API_KEY',
  applicationId: 'YOUR_APPLICATION_ID',
});

async function main() {
  try {
    // Get all records
    const allRecords = await client.getRecords('object_1');
    console.log('All Records:', allRecords);

    // Get a single record
    const singleRecord = await client.getRecord('object_1', 'RECORD_ID');
    console.log('Single Record:', singleRecord);

    // Get records with sorting, pagination, and filtering
    const options = {
      sorting: {
        sort_field: 'field_1',
        sort_order: 'asc' as const,
      },
      pagination: {
        rows_per_page: 10,
        page: 1,
      },
      filters: {
        match: 'and' as const,
        rules: [{ field: 'field_1', operator: 'is', value: 'test' }],
      },
    };
    const filteredRecords = await client.getRecords('object_1', options);
    console.log('Filtered Records:', filteredRecords);

  } catch (error) {
    console.error(error);
  }
}

main();
```

### API

#### `KnackApiClient`

- `constructor(config: KnackApiClientConfig)`
- `getRecords<T>(objectKey: string, options?: Options): Promise<T>`
- `getRecord<T>(objectKey: string, recordId: string): Promise<T>`
- `createRecord<T>(objectKey: string, record: any): Promise<T>`
- `updateRecord<T>(objectKey: string, recordId: string, record: any): Promise<T>`
- `deleteRecord<T>(objectKey: string, recordId: string): Promise<T>`

#### `KnackApiClientConfig`

- `apiKey: string`
- `applicationId: string`
- `apiBaseUrl?: string`

## `KnackViewClient` (for Client-Side Use)

This client is designed for client-side applications where you need to make requests on behalf of a logged-in user. It uses a user token for authentication and is limited to the permissions of the user.

### Usage

```typescript
import { KnackViewClient } from 'knack-ts-sdk';

// You can get the user token using Knack.getUserToken() in your app
const token = 'YOUR_USER_TOKEN';

const client = new KnackViewClient({
  token: token,
  applicationId: 'YOUR_APPLICATION_ID',
});

async function main() {
  try {
    // Get all records from a view
    const allRecords = await client.getRecords('scene_1', 'view_1');
    console.log('All Records:', allRecords);

    // Get a single record from a view
    const singleRecord = await client.getRecord('scene_1', 'view_1', 'RECORD_ID');
    console.log('Single Record:', singleRecord);

    // Get records from a view with sorting, pagination, and filtering
    const options = {
      sorting: {
        sort_field: 'field_1',
        sort_order: 'asc' as const,
      },
      pagination: {
        rows_per_page: 10,
        page: 1,
      },
      filters: {
        match: 'and' as const,
        rules: [{ field: 'field_1', operator: 'is', value: 'test' }],
      },
    };
    const filteredRecords = await client.getRecords('scene_1', 'view_1', options);
    console.log('Filtered Records:', filteredRecords);

  } catch (error) {
    console.error(error);
  }
}

main();
```

### API

#### `KnackViewClient`

- `constructor(config: KnackViewClientConfig)`
- `getRecords<T>(sceneKey: string, viewKey: string, options?: Options): Promise<T>`
- `getRecord<T>(sceneKey: string, viewKey: string, recordId: string): Promise<T>`
- `createRecord<T>(sceneKey: string, viewKey: string, record: any): Promise<T>`
- `updateRecord<T>(sceneKey: string, viewKey: string, recordId: string, record: any): Promise<T>`
- `deleteRecord<T>(sceneKey: string, viewKey: string, recordId: string): Promise<T>`

#### `KnackViewClientConfig`

- `token: string`
- `applicationId: string`
- `apiBaseUrl?: string`

### Query Options

The optional `options` parameter can be used to enhance queries and enable pagination. They are constrained with the following types.

```typescript
export interface SortOptions {
  sort_field: string;
  sort_order: 'asc' | 'desc';
}

export interface PaginationOptions {
  rows_per_page: number;
  page: number;
}

export interface FilterRule {
  field: string;
  operator: string;
  value: any;
}

export interface FilterOptions {
  match: 'and' | 'or';
  rules: FilterRule[];
}

export interface Options {
  pagination?: PaginationOptions;
  filters?: FilterOptions;
  sorting?: SortOptions;
}
```
