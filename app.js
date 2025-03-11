const express = require('express')
const path = require('path')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const soloModel = require('./src/soloevent')
const groupModel = require('./src/groupevent');
const mun = require('./src/mun')
const app = express()
const hbs= require('hbs')
const account = require('./src/models')
const nodemailer = require('nodemailer')
require("./src/conn")
const port = 3000;



const Storage = multer.diskStorage({
    destination: "./static/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: Storage
})

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        const verfyUser = jwt.verify(token, "mynameispradeepjatiamfrommaharajacollege");
        console.log(verfyUser)
        const user = await account.findOne({ _id: verfyUser._id })
        console.log(user.firstname)

        req.token = token
        req.user = user



        next();
    } catch (error) {
        res.status(200).redirect('/login')
    }
}


const static_path = path.join(__dirname, "./static");
app.use(express.static(static_path));

app.use(cookieParser())

const template_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

app.set('view engine', 'hbs');
app.set('views', template_path)
app.use(express.urlencoded())
hbs.registerPartials(partials_path)

app.get('/', (req,res)=>{
    res.status(200).render('index')
})

app.get('/events', (req,res)=>{
    res.status(200).render('events')
})

app.get('/solodance', (req,res)=>{
    res.status(200).render('solodance')
})
app.get('/duetdance', (req,res)=>{
    res.status(200).render('duetdance')
})
app.get('/groupdance', (req,res)=>{
    res.status(200).render('groupdance')
})
app.get('/solomusic', (req,res)=>{
    res.status(200).render('solomusic')
})
app.get('/groupmusic', (req,res)=>{
    res.status(200).render('groupmusic')
})
app.get('/antakshari', (req,res)=>{
    res.status(200).render('antakshari')
})
app.get('/nukkad', (req,res)=>{
    res.status(200).render('nukkad')
})
app.get('/admad', (req,res)=>{
    res.status(200).render('admad')
})
app.get('/monoact', (req,res)=>{
    res.status(200).render('monoact')
})
app.get('/creativecapture', (req,res)=>{
    res.status(200).render('creativecapture')
})
app.get('/reels', (req,res)=>{
    res.status(200).render('reels')
})
app.get('/cinematic', (req,res)=>{
    res.status(200).render('cinematic')
})
app.get('/designing', (req,res)=>{
    res.status(200).render('designing')
})
app.get('/hackathon', (req,res)=>{
    res.status(200).render('hackathon')
})
app.get('/coding', (req,res)=>{
    res.status(200).render('coding')
})
app.get('/bgmi', (req,res)=>{
    res.status(200).render('bgmi')
})
app.get('/valorant', (req,res)=>{
    res.status(200).render('valorant')
})
app.get('/mun', (req,res)=>{
    res.status(200).render('mun')
})
app.get('/creativewriting', (req,res)=>{
    res.status(200).render('creativewriting')
})
app.get('/debate', (req,res)=>{
    res.status(200).render('debate')
})
app.get('/poetry', (req,res)=>{
    res.status(200).render('poetry')
})
app.get('/quiz', (req,res)=>{
    res.status(200).render('quiz')
})
app.get('/jam', (req,res)=>{
    res.status(200).render('jam')
})
app.get('/postermaking', (req,res)=>{
    res.status(200).render('postermaking')
})
app.get('/rangoli', (req,res)=>{
    res.status(200).render('rangoli')
})
app.get('/sketching', (req,res)=>{
    res.status(200).render('sketching')
})
app.get('/facepainting', (req,res)=>{
    res.status(200).render('facepainting')
})
app.get('/fashion', (req,res)=>{
    res.status(200).render('fashion')
})
app.get('/mrmsaqua', (req,res)=>{
    res.status(200).render('mrmsaqua')
})
app.get('/tugofwar', (req,res)=>{
    res.status(200).render('tugofwar')
})
app.get('/treasure', (req,res)=>{
    res.status(200).render('treasure')
})
app.get('/agt', (req,res)=>{
    res.status(200).render('agt')
})
app.get('/standup', (req,res)=>{
    res.status(200).render('standup')
})
app.get('/meme', (req,res)=>{
    res.status(200).render('meme')
})
app.get('/bplan', (req,res)=>{
    res.status(200).render('bplan')
})

app.get('/sponsors', (req,res)=>{
    res.status(200).render('sponsors')
})
app.get('/team', (req,res)=>{
    res.status(200).render('team')
})
app.get('/faqs', (req,res)=>{
    res.status(200).render('faqs')
})
app.get('/aboutus', (req,res)=>{
    res.status(200).render('about')
})
app.get('/soloeventregister', auth, (req,res)=>{
    res.status(200).render('soloeventregister')
})
app.get('/groupeventregister', auth, (req,res)=>{
    res.status(200).render('groupeventregister')
})
app.get('/registermun', auth, (req,res)=>{
    res.status(200).render('registermun')
})
app.get('/eventregistered', (req,res)=>{
    res.status(200).render('eventregistered')
})
app.get('/forgetsuccess', (req,res)=>{
    res.status(200).render('forgetsuccess')
})
app.get('/developers', (req,res)=>{
    res.status(200).render('developers')
})
app.get('/team-2023', (req,res)=>{
    res.status(200).render('team-2023')
})



app.get('/resetpass', (req,res)=>{
    res.status(200).render('resetpass')
})
app.get('/forgetpass', (req,res)=>{
    res.status(200).render('forgetpass')
})

app.get('/login', (req,res)=>{
    res.status(200).render('login')
})

app.get('/register', (req,res)=>{
    res.status(200).render('register')
})
app.get('/profile', auth, async (req, res) => {
    const token = req.cookies.jwt;
    const verfyUser = jwt.verify(token, "mynameispradeepjatiamfrommaharajacollege");
    const user = await account.findOne({ _id: verfyUser._id })
    res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
    
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta name="theme-color" content="black">
        <title>Profile</title>
        <link rel="icon" type="image/x-icon" href="">
        <!-- aos cdn -->
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <!-- stylesheet -->
        <link rel="stylesheet" href="css/profile.css">
        <!-- fontawesome -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
            integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
    
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
    
    
    </head>
    
    <body>
        <header>
            <!-- navbar section stars from here -->
            <nav id=navBar>
                <div class="logo"><img src="photos/logo2.webp" alt="" style="width:200px"></div>
                <div class="tabs">
                    <ul class="tabs_button">
                        <a href="/">
                            <li id="home">Home</li>
                        </a>
                        <a href="/events">
                            <li id="events">Events</li>
                        </a>
                        <a href="/sponsors">
                            <li id="sponsors">Sponsors</li>
                        </a>
                        <a href="/team">
                            <li id="team">Team</li>
                        </a>
                        <a href="/FAQs">
                            <li id="faqs">FAQs</li>
                        </a>
                        <a href="/profile"><img src="photos/profile.png" class="profile" alt=""></a>
    
                    </ul>
    
                    <div class="hamburger" id="hamburger">
                        <button id="hamburger-button" onclick="hamburgerMenu()">
                            <span class="burger-bar" id="burger-bar1"></span>
                            <span class="burger-bar" id="burger-bar2"></span>
                            <span class="burger-bar" id="burger-bar3"></span></button>
                    </div>
    
    
    
                </div>
            </nav><!-- navbar section ends here -->
            <!-- mobile  toggle menu -->
            <div>
    
                <ul class="tabs_button2" id="tabs_button2">
                    <div class="profilebtndiv tabsbuttonclass">
                        <a href="/profile"><img src="photos/profile.png" class="profile" alt="v"></a>
                    </div>
                    <div class="hamburger-a-div">
                        <a href="/">
                            <li class="tabsbuttonclass" id="homeformobilenav">Home</li>
                        </a>
                        <a href="/events">
                            <li class="tabsbuttonclass" id="eventsformobilenav">Events</li>
                        </a>
                        <a href="/sponsors">
                            <li class="tabsbuttonclass" id="sponsorsformobilenav">Sponsors</li>
                        </a>
                        <a href="/team">
                            <li class="tabsbuttonclass" id="teamformobilenav">Team</li>
                        </a>
                        <a href="/FAQs">
                            <li class="tabsbuttonclass" id="faqsformobilenav">FAQs</li>
                        </a>
                    </div>
                    <div class="mobile-logout-btn-section">
                        <a href="/logout">
                            <button class="mobile-logout-btn"><i class="fas fa-sign-out-alt"></i>&nbsp;Logout</button>
    
                        </a>
                    </div>
    
                </ul>
            </div>
            <!-- mobile  toggle menu ends here-->
        </header> <!-- header ends here -->
    
    
        <main>
            <div class="big-daddy-profile-container">
                <!-- profile visual data like :- name and dp -->
                <div class="profile-visual-container">
                    <div class="profile-image-div">
                        <img src="photos/user-dp.svg" alt="user-image">
                        <div class="name-and-id">
                            <article id="username">${user.firstname} ${user.surname}</article>
                        </div>
                    </div>
    
                    <ul class="profile-toggle-menu">
                        <li><a href="" class="selected-tab"><i class="fas fa-user"></i>&nbsp;Profile</a></li>
                        <li><a href="/resetpass" class="unselected-tab">Reset Password</a></li>
                    </ul>
                </div><!-- profile visual data like :- name and dp -->
    
                <div class="profile-text-info-container">
                    <div class="personal-plus-college-details-merge-div">
    
                        <div class="personal-details-section">
                            <div class="details-heading-div">
                                <article id="personal-details-heading">User Details</article>
                            </div>
                            <div class="personal-details-info-div">
                                <div class="small-details-div">
                                    <article id="email-heading">Email</article>
                                    <p id="email-address">${user.email}</p>
                                </div>
                                <div class="small-details-div">
                                    <article id="contact-heading">Contact</article>
                                    <p id="contact">${user.phone}</p>
                                </div>
                                <div class="small-details-div">
                                    <article id="gender-heading">Gender</article>
                                    <p id="gender">${user.gender}</p>
                                </div>
                                <div class="small-details-div">
                                    <article >Address</article>
                                    <p id="contact">${user.address}</p>
                                </div>
    
                            </div>
                        </div>
    
                        <div class="college-details-section">
                            <div class="college-details-info-div">
                                <div class="small-details-div">
                                    <article id="college-name-heading">College</article>
                                    <p id="college-name">${user.college}</p>
                                </div>
    
                                <div class="small-details-div">
                                    <article id="college-name-heading">Course</article>
                                    <p id="college-name">${user.course}</p>
                                </div>
                                <div class="small-details-div">
                                    <article id="college-name-heading">Year</article>
                                    <p id="college-name">${user.year}</p>
                                </div>
    
                            </div>
                        </div>
    
                    </div>
                    <div class="collegeId-logout-btn-merge-section">
                        <div class="college-id-section">
                            <div class="details-heading-div">
                                <article class="college-id-heading">College ID</article>
                            </div>
                            <img src="/uploads/${user.idCard}" alt="CollegeId">
                        </div>
                        <div class="logout-btn-section">
                            <a href="/logout">
    
                                <button class="logout-btn"><i class="fas fa-sign-out-alt"></i>&nbsp;Logout</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    
        </main>
        <script>
        // for hamburger
        let tabsformobileclass = document.querySelectorAll('.tabsbuttonclass')
        function hamburgerMenu() {
            document.getElementById("tabs_button2").classList.toggle("show");
            document.getElementById("navBar").classList.toggle("navbarToggleClass");
            // document.getElementById("rotatebtn").classList.toggle("rotate")
            document.body.classList.toggle("stopscrolling")
            document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
            document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
            document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
    
            tabsformobileclass.forEach((item) =>
                item.classList.toggle('showmobiletabs'));
    
        }
    
    
        //   for profile first alphabet
    
        var username = document.getElementById("username").textContent;
        var mobileprofileBtn = document.getElementById("mobile-profile-btn");
        var profileBtn = document.getElementById("profile-btn");
        var firstletter = (username.charAt(0));
    
        mobileprofileBtn.textContent = firstletter;
        profileBtn.textContent = firstletter;
    
    
    </script>
    
    </body>
    
    
    </html>`);
})
app.get('/logout', auth, async (req, res) => {
    try {

        req.user.tokens = []
        res.clearCookie('jwt')
        req.user.save();
        res.redirect('/')
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await account.findOne({ email: email });
        const token = await useremail.generateAuthToken();
        const passmatch = useremail.password
     

        if (passmatch == password) {
            res.cookie("jwt", token)
            res.redirect('/')
        } else {
            res.render('invalidlogin');
        }
    } catch (error) {
        res.render('invalidlogin');
    }

})

app.post('/register', upload.single('idCard'), async(req,res)=>{
    
    const usrData = new account(req.body);
  
        if (req.file) {
            usrData.idCard = req.file.filename;
        }

        const token = await usrData.generateAuthToken();
       
        res.cookie("aqua", token, {
            expires: new Date(Date.now() + 100000),
            httpOnly: true
        })
        usrData.save().then(() => {
            res.render('registersuccess')
        }
        ).catch(() => {
            res.status(400).send('Registration Failed')
        })

})

app.post('/soloeventreg' ,async(req,res)=>{
    const mail = req.body.email;
    const usr = await account.findOne({email:mail});
    const name = `${usr.firstname}  ${usr.surname}`;
    const soloEventData = new soloModel({
        name:name,
        email:mail,
        phone:usr.phone,
        soloevent:req.body.soloevent,
	    college:usr.college
    });
    await soloEventData.save().then(()=>{
        res.status(200).render('eventregistered')
    }
    ).catch(()=>{
        res.status(400).send("error")
    }
    )


})

app.post('/groupeventreg',async(req,res)=>{
    const mail = req.body.email;
    const groupEvent = req.body.event;
    const usr = await account.findOne({email:mail});
    const name = `${usr.firstname}  ${usr.surname}`;
    const groupEventData = new groupModel({
        email:mail,
        name:name,
        phone:usr.phone,
        groupevent:groupEvent,
        teammates:req.body.teammates,
        teamname:req.body.teamname,
	    college:usr.college
    });
    await groupEventData.save().then(()=>{
        res.status(200).render('eventregistered')
    }
    ).catch(()=>{
        res.status(400).send("error")
    }
    )

})
app.post('/mun',async(req,res)=>{
    const mail = req.body.email;
    const usr = await account.findOne({email:mail});
    const name = `${usr.firstname}  ${usr.surname}`;
    const munData = new mun({
        email:mail,
        name:name,
        phone:usr.phone,
        portfolio1:req.body.portfolio1,
        portfolio2:req.body.portfolio2,
        PreviousExperiences:req.body.PreviousExperiences,
	    college:usr.college
    });
    await munData.save().then(()=>{
        res.status(200).render('eventregistered')
    }
    ).catch(()=>{
        res.status(400).send("error")
    }
    )

})

app.post('/forgetpass', async (req, res) => {
    const email = req.body.email
    const usrmail =await account.findOne({ email: email })
     if (usrmail) {
        let chars ="0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 8;
        let password='';
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        await account.updateOne({ email:email},{$set:{ password: password}})
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'techyuvas.aquaregia@gmail.com',
                pass: 'ajxxsvmrrbnvynhz'
            }
        });
    
        const mailOptions = {
            from: 'techyuvas.aquaregia@gmail.com',
            to: email,
            subject: 'Forget Password',
            html: `<p>Here is your new password for Aquaregia</p><br><p>Password = ${password}</p> <br> <p>Please do not share this password with anyone else</p>`
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.send(error);
            } else {
                res.status(200).render('forgetsuccess')
            }
        }); 
        } else {
            res.status(400).render('invalidemail')
        }
        
   

})

app.post('/resetpass', async (req, res) => {
    const email = req.body.email
    const usrmail = await account.findOne({ email: email })
    const npass = req.body.npass
    const cpass = req.body.cpass
    if (cpass == usrmail.password) {
        await account.updateOne({ email: email }, { $set: { password: npass } })
        res.send('reset successfull')
    }
    else{
        res.send('Enter valid Old password')
    }
})



app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
