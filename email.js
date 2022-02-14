const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function EmailHtml(name, email, message) {
  return `
  <!Doctype html/>
    <html>
    <head>
    </head>
    <body>
    <div style="background-color:grey;color:#fff; width:70%; margin:4rem auto">
     <div style="text-align:center;">
      <h1 style="text-align:center;margin:2rem 0;">Welcome to Heritage Kashmir</h1>
      <h2 style="font">Hello ${name} friend</h2>
      <p>we appreciate your effort and we will get back to you shortly on your email :<span style="font-size:1.5rem; font-weight:bold;">${email}</p>
      <p style="font-size:1.7rem; font-weight:bold">we are looking for the best packages available for you</p>
      <div>
        <span style="font-size:1.7rem;> "${message}</span>
      </div>
     </div>
    </div>
    </body>
    </html>
  `
}

function getMessage(emailParams) {
  return {
    to: emailParams.toEmail,
    from: 'Your_EMAIL_ID',
    subject: 'We have   got your order, you will receive it soon',
    text: `Hey ${emailParams.name}, we have received your Email. We will get back soon`,
    html: EmailHtml(emailParams.name, emailParams.toEmail,emailParams.message),
  };
}

async function sendEmail(emailParams) {
  try {
    await sendGridMail.send(getMessage(emailParams));
    return  { message: `confirmation email sent successfully for email: ${emailParams.email}`};
  } catch (error) {
    const message = `Error sending email `;
    console.error(message);
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
    return {message};
  }
}

module.exports = {
  sendEmail
}
