const { register, login } = require("../services/auth.services");

//User Registration controller
const signUp = async (req, res, next) => {
    try{
         const { newUser, userToken } = await register(req.body);
         res.status(201).json({
            status: 201,
            message: "User was successfully registred",
            data: {
                user: newUser,
                token: userToken
            }
         })
    }catch(err) {
        next(err);
    }
}

//User Authentication Controller  
const signIn = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const { user, token } = await login(email, password);

        if(!user){
            res.status(404).json({
                status: 404,
                message: "User was not found !",
                data: null
            });
        }

        res.status(201).json({
            status: 201,
            message:"User was successfully Logged !",
            data: {
                user,
                token
            }
        })
    }catch(err){
        next(err);
    }
}

module.exports = {
    signUp,
    signIn
}