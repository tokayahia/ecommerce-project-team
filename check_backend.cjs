const http = require('http');

console.log('Testing connection to backend...');

const checkUrl = (path) => {
  return new Promise((resolve) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      console.log(`Response from ${path}: Status ${res.statusCode}`);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`Body length: ${data.length}`);
        resolve(true);
      });
    }).on('error', (err) => {
      console.log(`Error connecting to ${path}:`, err.message);
      resolve(false);
    });
  });
};

async function run() {
  console.log('Checking /products (no slash)...');
  await checkUrl('/products');
  console.log('Checking /products/ (with slash)...');
  await checkUrl('/products/');
}

run();
