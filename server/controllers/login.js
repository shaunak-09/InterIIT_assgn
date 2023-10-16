const User = require("../models/users")
const bcrypt=require("bcryptjs")

const login= async (req,res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');
    // const data =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
    
        if (result) {
          console.log('Password is correct');
          res.json({username:user.username,email});
        } else {
          console.log('Password is incorrect');
          res.status(400).json('Invalid email or password');
        }
      });



}
module.exports=login