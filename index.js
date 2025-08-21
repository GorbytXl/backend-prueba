const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware para registrar las peticiones
app.use((req, res, next) => {
  console.log(`Petición recibida en: ${req.url}`);
  next();
});

// Endpoint para la suma
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    console.log(`Error: Petición con números inválidos`);
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
        console.log(`Error: Intento de división por cero`);
        return res.status(400).json({ error: 'Cannot divide by zero.' });
      }
      result = num1 / num2;
      break;
    default:
      console.log(`Error: Operación inválida`);
      return res.status(400).json({ error: 'Invalid operation.' });
  }

  console.log(`Petición exitosa: ${num1} ${operation} ${num2} = ${result}`);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Calculator backend listening at http://localhost:${port}`);
});
