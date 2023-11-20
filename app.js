const express = require("express");
const path = require ("path");
const mongoose = require("mongoose");
const app= express();
const port=80;
const bcrypt = require("bcrypt")
 
const connect = mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB")


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const collection = new mongoose.model("User", userSchema)

module.exports = collection;
//EXPRESS SPECIFIC STUFF
app.use('/css',express.static('css'))//for serving static files
app.use('/js',express.static('js'))//for serving js files
app.use('/images',express.static('images'))//for serving images files
app.use(express.json());
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug')//Set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('index.pug',params);
})
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})
app.get('/login',(req,res)=>{
    const params = {}
    res.status(200).render('login.pug',params);
})
app.get('/register',(req,res)=>{
    const params = {}
    res.status(200).render('register.pug',params);
})
app.post('/login', async(req,res)=>{
        const useremail = await collection.findOne({email:req.body.email});
        if (!useremail){
            res.send("user name cannot found");
        }else{
            const check = await bcrypt.compare(req.body.password,useremail.password);
            if(check){
                res.render("index");
            }else{
                res.send("wrong details");
            }
        }
})
app.post('/register',async(req,res)=>{
        const data = {
             name :req.body.name,
             email : req.body.email,
             password : req.body.password
        }

        //checking if the user has already registered
        const check = await collection.findOne({email: data.email});
        if(check){
            res.send("User already exists.")
        }else{
            const saltRounds =10;
            const hashedPassword = await bcrypt.hash(data.password , saltRounds);
            data.password = hashedPassword;
            const userdata = await collection.insertMany(data);
            console.log(userdata);
            res.send("The User have been registered successfully")
        }
       

})


app.all('*', (req, res) => { 
    res.status(404).render('404.pug'); 
}); 


// START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
})