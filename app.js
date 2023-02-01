
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
            auth : "kiran:00a096902a471ad13b2a2f4c5c63fc2e-us21"
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
// 00a096902a471ad13b2a2f4c5c63fc2e-us21

// Audience Id
// e38686d873