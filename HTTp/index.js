const http = require('http');

const server = http.createServer((req,res) =>{
   if(req.url == '/'){
    res.writeHead(200);
    res.write("Hi this is home page");
    res.end();
   }
   else if(req.url == '/about'){
    res.writeHead(200 , {"Content-type" : "text/html"});
    res.write("<h1>Hey this is About page</h1>");
    res.end();
   }
   else{
    res.writeHead(404);
    res.end("404 Page not Foud");
   }
}).listen(8000 , '127.0.0.1' ,() =>{
    console.log("Connection Done");
})
