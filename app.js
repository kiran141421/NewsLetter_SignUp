
const express=require('express');
const bodyParser=require('body-parser');
//const request=require('request');
const https=require('https');
const { request } = require('http');

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
});

app.post("/",function(req,res){
    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var eMail=req.body.mail;

    // console.log(firstName+lastName+eMail);
    var data={
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url= "https://us21.api.mailchimp.com/3.0/lists/e38686d873";

    const options={
            method : "POST",
            auth : "kiran:c7ffa8d361d3c2c9ab218bbe0258ab41-us21"
    }

    var request = https.request(url,options,function(response){

        var code=response.statusCode;
        if(code===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORTtouch ||3000,function(){
    console.log('server running on port 3000');
});




// API kEY
// ede5e1ad2e2efeb54ffcb094d2ee4b8a-us21

// Audience Id
// e38686d873