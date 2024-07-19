# Tipjar API
New experiment to create a transaction system for tipping workers. Might eventually move it onchain where a tipjar is a smart wallet.  

## Stack
Built with Next.js
Hosted on Vercel (for now; might move it to a new cloud host for learning, like Cloudflare)

## TODOS
- Fix category to worker relationship so that workers are created with a category; and not trying to lookup a category
- CORS: If you're planning to access these API endpoints from a frontend application, you might need to set up CORS (Cross-Origin Resource Sharing) headers.
- Documentation: Now that your API is deployed, it might be a good time to document your endpoints for any team members or future users.
- Testing: Ensure you've tested all your endpoints thoroughly on the deployed version. Sometimes, issues that don't appear in local development can surface in a production environment.
- Create then push to a new Git repo
- Build a frontend to test the API and authentication across hosts; assume CORS requirements

## Local dev and test
```
npm install
npm run dev
```
