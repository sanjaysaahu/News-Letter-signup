const express= require("express")
const bodyParser = require("body-parser")
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app= express()
app.use(bodyParser.urlencoded({ extended: true }))




app.use(express.static('public'))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})


app.post("/",function(req,res){
    let firstNamee = req.body.fname 
    let lastNamee = req.body.lname 
    let emaile = req.body.email

    //console.log(firstName+lastName+email)


    mailchimp.setConfig({

        apiKey: "710ca6f69c9f877b508702561f530f74-us11",
        server: "us11",
    });
    const listId = "1fdc474fe2";

    const subscribingUser = {

          firstName:firstNamee,
          lastName: lastNamee,
          email: emaile
    };
         
     console.log(subscribingUser.email)

    async function run() {
          const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
              FNAME: subscribingUser.firstName,
              LNAME: subscribingUser.lastName
            }
           } );

        console.log(response.statusCode)
        if (response.status=="subscribed"){ 
            res.sendFile(__dirname+"/successpage.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        } 
}
    run();

})



app.listen(process.env.PORT,function(){
    console.log("server is succesfully running")
})
//710ca6f69c9f877b508702561f530f74-us11
//1fdc474fe2.