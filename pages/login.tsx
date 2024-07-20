import { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
    } else {
        // Set the token in the component state
        setToken(data.session?.access_token || '');
      // Redirect to home page or dashboard after successful login
      router.push('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {token && (
        <div>
          <h3>Access Token:</h3>
          <textarea readOnly value={token} style={{ width: '100%', height: '100px' }} />
        </div>
      )}
    </div>
  );
}

// Function to fetch categories (example of authenticated API call)
const fetchCategories = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    console.error('No access token available');
    return;
  };

  const response = await fetch('/api/categories', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    console.error('Failed to fetch categories:', response.statusText);
    return;
  }

  const categories = await response.json();
  console.log('Categories:', categories);
};