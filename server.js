// const sgMail = require('@sendgrid/mail')
const express = require('express');
const app = express();
const email = require('./email');
// app.get('/', (req, res) => {
//     res.send('hello world');
// })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
// app.get('/', (req, res) => {
//   // res.json({message: 'alive'});
// })
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

const course = [
    {id: 1, name: 'hello'},
{id: 2, name: 'world'},
{id: 3, name: 'what'},
]
app.get('/api/courses', (req, res) => {
    res.send(course)
})

// app.post('/api/sendEmail', (req, res) => {

// })

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'codershahid@gmail.com', // Change to your recipient
//   from: 'mdre3277@gmail.com', // Change to your verified sender
//   subject: 'Heritage Kashmir Response',
//   text: 'Heritage Kashmir Response',
//   html: '<strong>THank you for your responasae   here is the working</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
const port = process.env.PORT || 8080;
app.listen(port, console.log(`port is ${port} and server is up and running`));