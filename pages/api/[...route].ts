import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Authentication middleware
const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  return user
}

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route hit')
  console.log('Method:', req.method)
  console.log('URL:', req.url)

  // Test route for authentication
  if (req.method === 'GET' && req.url === '/api/test-auth') {
    console.log('Test auth route hit')

    // Authenticate the request
    const user = await authenticate(req, res)
    if (!user) return // If authentication failed, the response has already been sent

    // If we get here, authentication was successful
    return res.status(200).json({ message: 'Authentication successful', user: user })
  }

  // Handle POST requests to /api/create-category
  if (req.method === 'POST' && req.url === '/api/create-category') {
    console.log('Create category route hit')

    // Authenticate the request
    const user = await authenticate(req, res)
    if (!user) return // If authentication failed, the response has already been sent

    try {
      console.log('Request body:', req.body)
      const { name } = req.body

      if (!name) {
        return res.status(400).json({ error: 'Name is required' })
      }

      const { data, error } = await supabase
        .from('category')
        .insert({ name })
        .select()
        .single()

      if (error) {
        console.log('Supabase error:', error)
        return res.status(400).json({ error: error.message })
      }

      console.log('Category created:', data)
      return res.status(200).json({ category: data })
    } catch (error) {
      console.error('Error in create-category:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

    // Handle POST requests to /api/create-worker
    if (req.method === 'POST' && req.url === '/api/create-worker') {
      console.log('Create worker route hit')
  
      // Authenticate the request
      const user = await authenticate(req, res)
      if (!user) return // If authentication failed, the response has already been sent
  
      try {
        console.log('Request body:', req.body)
        const { name, bio, tip_method, category_id } = req.body
  
        if (!name || !category_id) {
          return res.status(400).json({ error: 'Name and category_id are required' })
        }
  
        // Fetch the category to ensure it exists and get its name
        const { data: category, error: categoryError } = await supabase
          .from('category')
          .select('id, name')
          .eq('id', category_id)
          .single()
  
        if (categoryError || !category) {
          return res.status(400).json({ error: 'Invalid category_id' })
        }
  
        // Insert the new worker
        const { data: worker, error: workerError } = await supabase
          .from('worker')
          .insert({
            name,
            bio: bio || '',
            tip_method: tip_method || '',
            category_id: category.id,
            category_name: category.name
          })
          .select()
          .single()
  
        if (workerError) {
          console.log('Supabase error:', workerError)
          return res.status(400).json({ error: workerError.message })
        }
  
        console.log('Worker created:', worker)
        return res.status(200).json({ worker })
      } catch (error) {
        console.error('Error in create-worker:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }

      // Handle POST requests to /api/create-tipjar
  if (req.method === 'POST' && req.url === '/api/create-tipjar') {
    console.log('Create tipjar route hit')

    // Authenticate the request
    const user = await authenticate(req, res)
    if (!user) return // If authentication failed, the response has already been sent

    try {
      console.log('Request body:', req.body)
      const { worker_id, platform, account_id } = req.body

      if (!worker_id || !platform || !account_id) {
        return res.status(400).json({ error: 'worker_id, platform, and account_id are required' })
      }

      // Check if the worker exists
      const { data: worker, error: workerError } = await supabase
        .from('worker')
        .select('id')
        .eq('id', worker_id)
        .single()

      if (workerError || !worker) {
        return res.status(400).json({ error: 'Invalid worker_id' })
      }

      // Insert the new tipjar
      const { data: tipjar, error: tipjarError } = await supabase
        .from('tipjar')
        .insert({
          worker_id,
          platform,
          account_id
        })
        .select()
        .single()

      if (tipjarError) {
        console.log('Supabase error:', tipjarError)
        return res.status(400).json({ error: tipjarError.message })
      }

      console.log('Tipjar created:', tipjar)
      return res.status(200).json({ tipjar })
    } catch (error) {
      console.error('Error in create-tipjar:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

    // Handle POST requests to /api/create-tip
    if (req.method === 'POST' && req.url === '/api/create-tip') {
      console.log('Create tip route hit')
  
      // Authenticate the request
      const user = await authenticate(req, res)
      if (!user) return // If authentication failed, the response has already been sent
  
      try {
        console.log('Request body:', req.body)
        const { worker_id, tipjar_id, amount, currency } = req.body
  
        if (!worker_id || !tipjar_id || !amount || !currency) {
          return res.status(400).json({ error: 'worker_id, tipjar_id, amount, and currency are required' })
        }
  
        // Check if the worker exists
        const { data: worker, error: workerError } = await supabase
          .from('worker')
          .select('id')
          .eq('id', worker_id)
          .single()
  
        if (workerError || !worker) {
          return res.status(400).json({ error: 'Invalid worker_id' })
        }
  
        // Check if the tipjar exists and belongs to the worker
        const { data: tipjar, error: tipjarError } = await supabase
          .from('tipjar')
          .select('id')
          .eq('id', tipjar_id)
          .eq('worker_id', worker_id)
          .single()
  
        if (tipjarError || !tipjar) {
          return res.status(400).json({ error: 'Invalid tipjar_id or tipjar does not belong to the specified worker' })
        }
  
        // Insert the new tip
        const { data: tip, error: tipError } = await supabase
          .from('tip')
          .insert({
            worker_id,
            tipjar_id,
            amount,
            currency
          })
          .select()
          .single()
  
        if (tipError) {
          console.log('Supabase error:', tipError)
          return res.status(400).json({ error: tipError.message })
        }
  
        console.log('Tip created:', tip)
        return res.status(200).json({ tip })
      } catch (error) {
        console.error('Error in create-tip:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }

  // Handle other routes or methods
  res.status(404).json({ error: 'Not Found' })
}