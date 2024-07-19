require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in the environment')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function getToken() {
  const email = ''
  const password = ''

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    console.error('Error signing in:', signInError.message)
    return
  }

  console.log('Access Token:', signInData.session.access_token)
}

getToken()