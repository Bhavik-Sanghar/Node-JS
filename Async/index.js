const fs = require("fs")

fs.mkdir("Thapa" ,(err,data)=>{console.log("folder Created !!!")})

fs.writeFile("Thapa/bio.txt" , "Hello My name is Bio Txt" , (err,data)=>{
    console.log("file Craeted !!")
});

fs.appendFile("Thapa/bio.txt" , " Hey i add new txt just now see !!!!" , (err, data)=>{console.log("Data Appended !!!!")})

fs.readFile("Thapa/bio.txt" , "utf-8" , (err,data) => {console.log("File Data is : " + data)})

fs.rename("Thapa/bio.txt" , "Thapa/MyBio.txt" , (err,data) => {console.log("File renamed !!")})

fs.rm("Thapa/MyBio.txt" , (err,data)=>{console.log("")})

fs.rmdir("Thapa" , (e,d) =>{console.log("Folder Deleted")})
