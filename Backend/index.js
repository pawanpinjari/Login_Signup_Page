const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');
// const Task = require('./models/Task')
require('dotenv').config();
require('./db');
const PORT = 8000;

app.use(cors());

app.use(bodyParser.json());


app.post('/signup', async (req, res) => {
    
    try {
    const { name,address,mobile, email, password,role } = req.body;
        const user = new User({ name,address,mobile, email, password, role });
        const data=await user.save();
        console.log("user",user)
        console.log("data",data)
        res.json({ user, message: "User Register Successfully" });
    }

    catch (err) {

        res.json({ error: err });
    }

});
app.post('/login', async (req, res) => {
   try {
    const { email, password,role } = req.body;
    const user = await User.findOne({ email:email,role:role });
   
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        console.log("fasle")
        return res.json("notexist");
    }
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET_KEY );
    res.json({ user, token , message: "Logged in successfully"});
   }
    catch (err) {
       return res.json("notexist")
    }
 });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});