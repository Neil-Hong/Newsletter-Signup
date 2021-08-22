const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

client.setConfig({
  apiKey: "6562a9e11decb48097ddfeb8b1d51aa9-us5",
  server: "us5",
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.eName;
  console.log(firstName, lastName, email);


  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  // const jsonData = JSON.stringify(data);

  const run = async () => {
    try {
      const response = await client.lists.addListMember("3514e86f49", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
})

// 6562a9e11decb48097ddfeb8b1d51aa9-us5

// 3514e86f49
