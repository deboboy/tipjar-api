import React from 'react'

const Home: React.FC = () => {
  return (
    <div>
      <h1>Tipjar API</h1>
      <p>Transaction system for tipping workers. Will be migrated to onchain where a tipjar is a smart wallet.</p>
      
      <div className="documentation">
        <h2>Route Handlers</h2>
        <p>The API handles several routes:</p>

        <h3>Test Authentication</h3>
        <ul>
          <li><strong>Route</strong>: GET <code>/api/test-auth</code></li>
          <li><strong>Purpose</strong>: Verify if the authentication is working correctly</li>
        </ul>

        <h3>Create Category</h3>
        <ul>
          <li><strong>Route</strong>: POST <code>/api/create-category</code></li>
          <li><strong>Purpose</strong>: Create a new category of workers; for example 'healthcare'</li>
          <li><strong>Required Fields</strong>: <code>name</code></li>
        </ul>

        <h3>Create Worker</h3>
        <ul>
          <li><strong>Route</strong>: POST <code>/api/create-worker</code></li>
          <li><strong>Purpose</strong>: Create a new worker; for example 'Manual'</li>
          <li><strong>Required Fields</strong>: <code>name</code>, <code>category_id</code></li>
          <li><strong>Optional Fields</strong>: <code>bio</code>, <code>tip_method</code></li>
        </ul>

        <h3>Create Tipjar</h3>
        <ul>
          <li><strong>Route</strong>: POST <code>/api/create-tipjar</code></li>
          <li><strong>Purpose</strong>: Create a new tipjar for a worker</li>
          <li><strong>Required Fields</strong>: <code>worker_id</code>, <code>platform</code>, <code>account_id</code></li>
        </ul>

        <h3>Create Tip</h3>
        <ul>
          <li><strong>Route</strong>: POST <code>/api/create-tip</code></li>
          <li><strong>Purpose</strong>: Record a new tip for a worker</li>
          <li><strong>Required Fields</strong>: <code>worker_id</code>, <code>tipjar_id</code>, <code>amount</code>, <code>currency</code></li>
        </ul>
      </div>
      <hr /> {/* Added horizontal line */}
      <div className="footer">
        <p>© 2024 @deboboy; built with Hono, Next.js + Cursor</p>
      </div>
    </div>
  )
}

export default Home