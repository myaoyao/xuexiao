/**
 * Created by zhaowei on 17/3/7.
 */
var express=require("express");
var proxy=require("express-http-proxy");
var app=express();
var port=6660;
var apiProxy=proxy("http://192.168.55.10:9000",{
    forwardPath:function(req,res){
        return req._parsedUrl.path
    }
})
app.use("/rest/*",apiProxy);

app.use(express.static('build'));
app.listen(port);
console.log('http://localhost:'+port);
