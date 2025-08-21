const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Habilita el análisis de JSON en las solicitudes

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite peticiones desde cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint para la suma
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers provided.' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero.' });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation.' });
  }
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Calculator backend listening at http://localhost:${port}`);
});
