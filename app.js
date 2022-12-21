const express= require("express");
const bodyParser=require("body-parser");
const https=require("https");


const server=express();
var icon;

server.use(bodyParser.urlencoded({extended:true}));
var temprature;
var imageURL;
server.get("/",(req,res)=>{



res.sendFile(__dirname+"/index.html");


});

server.post("/",(req,res)=>{
 


    var name=req.body.country;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&units=metric&appid=ed232eda09494c8556b8bee85b7003fb";
 https.get(url,(response)=>{
     
         response.on("data",(data)=>{
            const weatherData=JSON.parse(data)
            temprature=weatherData.main.temp;
            icon=weatherData.weather[0].icon;
         imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
         
            console.log(temprature);
            
         
        });





    });

    res.write("<h1>The Temperature in "+name+" is "+temprature+"</h1>")
    console.log(temprature);
     res.write("<img src= "+imageURL+">");
    res.send(); 
});




server.listen(8000,()=>{
    console.log("this server is running on port 3000");
})





