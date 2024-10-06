# Tipjar API
New experiment to create a transaction system for tipping workers. It will eventually be migrated to onchain where a tipjar is a smart wallet.  

## Stack
Built with Next.js
Hosted on Vercel (for now; might move it to a new cloud host for learning, like Cloudflare)

# API Code Explanation

This explains the structure and functionality of the Next.js API route handler that integrates with Supabase for authentication and database operations.

## Table of Contents

1. [Setup](#setup)
2. [Authentication](#authentication)
3. [Route Handlers](#route-handlers)
   - [Test Authentication](#test-authentication)
   - [Create Category](#create-category)
   - [Create Worker](#create-worker)
   - [Create Tipjar](#create-tipjar)
   - [Create Tip](#create-tip)
4. [Error Handling](#error-handling)

## Setup

The API uses Supabase as its backend service. The Supabase client is initialized with environment variables:

```javascript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

## Authentication

The API implements a middleware function `authenticate` to verify the user's token:

```javascript
const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  // Authentication logic
}
```

This function checks for a valid bearer token in the request headers and verifies it with Supabase.

## Route Handlers

The API handles several routes:

### Test Authentication

- **Route**: GET `/api/test-auth`
- **Purpose**: Verify if the authentication is working correctly

### Create Category

- **Route**: POST `/api/create-category`
- **Purpose**: Create a new category of workers; for example 'healthcare'
- **Required Fields**: `name`

### Create Worker

- **Route**: POST `/api/create-worker`
- **Purpose**: Create a new worker; for example 'Manual'
- **Required Fields**: `name`, `category_id`
- **Optional Fields**: `bio`, `tip_method`

### Create Tipjar

- **Route**: POST `/api/create-tipjar`
- **Purpose**: Create a new tipjar for a worker
- **Required Fields**: `worker_id`, `platform`, `account_id`

### Create Tip

- **Route**: POST `/api/create-tip`
- **Purpose**: Record a new tip for a worker
- **Required Fields**: `worker_id`, `tipjar_id`, `amount`, `currency`

## Error Handling

The API implements error handling at multiple levels:

1. Authentication errors (401 Unauthorized)
2. Input validation errors (400 Bad Request)
3. Database operation errors (400 Bad Request with error message)
4. Unexpected errors (500 Internal Server Error)

Each route handler is wrapped in a try-catch block to catch and handle any unexpected errors.

---

This API provides a robust backend for managing workers, categories, tipjars, and tips. It ensures proper authentication and data validation before performing any database operations.

## TODOS
- Refactor Supabase auth to use anon key; move away from service role
- Fix category to worker relationship so that workers are created with a category; and not trying to lookup a category
- Add error handling for the Create Tip route; for amount and currency
- CORS: If you're planning to access these API endpoints from a frontend application, you might need to set up CORS (Cross-Origin Resource Sharing) headers.
- Build a frontend to test the API and authentication across hosts; assume CORS requirements

## Local dev and test
```
npm install
npm run dev
```
