const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const { json } = require("express")
const app = express()

app.use(bodyParser.urlencoded({extended : true}))

app.use(express.static("Public"))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})


app.post("/",function(req,res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }

            }
        ]
    }

    const jsondata = JSON.stringify(data)

    const url = "https://us17.api.mailchimp.com/3.0/lists/c75fe01243"
    const options = {
        method : "POST",
        auth : "ramsunil:f57cb869b980b7a21cda35f8dd1627e1-us17"
    }

    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log( JSON.parse(data))
            const statusCode = response.statusCode

            if(statusCode === 200){
                res.sendFile(__dirname + "/success.html")
            }
            else{
                res.sendFile(__dirname + "/failure.html")
            }
        })
    })

    request.write(jsondata)
    request.end()
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server 3000 port is started")
})


// apikey
// f57cb869b980b7a21cda35f8dd1627e1-us17

//list id
// c75fe01243