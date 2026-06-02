import fetch from 'node-fetch';

const response = await fetch('http://localhost:2025/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ history: [{ role: 'user', content: 'Ciao' }] })
});
const text = await response.text();
console.log('STATUS', response.status);
console.log('BODY', text);
