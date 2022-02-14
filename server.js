const express = require('express');
const app = express();
const email = require('./email');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  console.log('get')
    res.sendFile('index.html', { root: __dirname });
});
app.post('/api/email/order-confirmation', async (req, res, next) => {
  try {
    res.json(await email.sendEmail(req.body));
  } catch (err) {
    next(err);  
  }
}); 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
}); 
const port = process.env.PORT || 8080;
app.listen(port, console.log(`port is ${port} and server is up and running`));
