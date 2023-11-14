const express = require("express");
const path = require ("path");
const app= express();
const port=80;

//EXPRESS SPECIFIC STUFF
app.use('/css',express.static('css'))//for serving static files
app.use('/js',express.static('js'))//for serving js files
app.use('/images',express.static('images'))//for serving images files
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
app.post('/login',async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await login.findOne({email:email});
        if (useremail.password === password){
            res.status(200).render("index");
        }else{
            res.send("password are not matching");
        }

    }catch(error){
        res.status(400).send("Invalid Email")
    }
})
app.post('/register',async(req,res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = register.findOne({email:email});
        if (useremail){
            res.status("User already registered");
        }   else{
            const user = new useremail({
                name,
                email,
                password
            })
            user.save(err =>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send("Successfully Registered,please login now")
                }
                })
        }

    }catch(error){
        res.status(400).send("Invalid Email")
    }
})


app.all('*', (req, res) => { 
    res.status(404).render('404.pug'); 
}); 


// START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
})