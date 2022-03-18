const express = require('express');
const mongoose = require('mongoose');
const nodemailer=require('nodemailer');

//express app
const app = express();

//connect to mongodb(database)
//const dbURI = 'mongodb+srv://tester1:test1234@cluster0.mivb9.mongodb.net/Application-data?retryWrites=true&w=majority';

// mongoose.connect(dbURI)
//   .then((result) => console.log("connected to db"))
//   .catch((err) => console.log(err))

app.listen(3000, () => {
  console.log("Server started on port 5000");
});


//MIDDLEWARE AND STATIC FILES
app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

//ROUTING
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index-home.html');
});

app.get('/appli', (req, res) => {
  res.sendFile(__dirname + '/appli.html');
});

// app.get('/application', (req, res) => {
//   res.sendFile(__dirname + '/index-application1.html');
// });
//
// app.get('/application-next', (req, res) => {
//   res.sendFile(__dirname + '/index-application2.html');
// });

app.post('/info',(req,res)=>{

  console.log(req.body);

  // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'fitnessempire1998@gmail.com', // generated ethereal user
        pass: 'Ashishdd@19'  // generated ethereal password
    }
  });
  var mailingList='vijethumesh2002@gmail.com';
  // setup email data with unicode symbols
  let mailOptions = {
      from: 'unekcustomercare@gmail.com', // sender address
      to: mailingList, // list of receivers
      subject: 'New registration', // Subject line
      text: `New `, // plain text body
      html:`<p>Name : ${req.body.name}</p>
      <p>Number : ${req.body.number}</p>
      <p>Occupation : ${req.body.occu}</p>
      <p>Email : ${req.body.email}</p>
      <p>Gender:${req.body.gender}</p>
      <p>Insurance:${req.body.insurance}</p>
      <p>Membership plan:${req.body.Membership}</p>
      <p>How did you find out  about the gym : ${req.body.find}</p>
      <p>Surgery in the last 5 years : ${req.body.surgery}</p>
      <p>More information : ${req.body.else}</p>`

  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  });

})

//HANDLING 404 ERROR PAGE
// app.use((req, res) => {
//   res.send("<h1>404</h1> <p>oops, cannot find this page!</p>");
// });











//HOME GET STARTED BUTTON
// function handclick() {
//   app.get('/application', (req, res) => {
//     res.sendFile(__dirname + '/index-application1.html');
//   });
// }
// document.querySelector("#btn-home").addEventListener("click", handclick);
