require('dotenv').config();
const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_ALGO_HASH } = process.env;
const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');
const { findUserBy, create } = require('./user.services');
const { isAllFilled } = require('../utils/Fields');

//Generate Json Web Token
const generateToken = (user) => {
    return jwt.sign({ id: user.id},
        JWT_SECRET, {
            algorithm: JWT_ALGO_HASH
        },
        {
            expiresIn: JWT_EXPIRES_IN
        }
    )
}

//Hash User Password
const HashPassword = async (password) => {
    const HashedPassword = await bcrypt.hash(password, 10);
    return HashedPassword;
}

//Check For User Already signed
const AlreadySigned = async (email) => {
    return await findUserBy({email});
}

//Create New User with Hashed Password
const register = async (userData) => {
    try{
        const { fullName, email, password } = userData;
        if(!isAllFilled(userData)){
            throw new HttpError(401, "Do not pass a empty value", userData);
        }

        if(AlreadySigned(email) === true){
            throw new HttpError(401, "User Already Exist", userData);
        }

        const HashedPassword = await HashPassword(password);
        const newUser = await create({fullName, email, password:HashedPassword});
        const userToken = generateToken(newUser.id);

        return {newUser, userToken};
    }catch(err) {
        throw new HttpError(err.status, err.message, err.data)
    }
}

//Authenticate User with Json Web Token
const login = async (email, password) => {
    try{
        const user = await AlreadySigned(email);
        if(!user){
            throw new HttpError(404, 'No account associated with this email', email);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new HttpError(401,'Invalid password', null);
        }
        
        return {
            user,
            token: generateToken(user.id)
        }
    }catch(err){
        throw new HttpError(err.status, err.message, err.data);
    }
}

//Use For Make Authentification Required
function requireAuth(req, res, next) {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 401,
      message: 'Authorization header missing or malformed. Use: Bearer <token>',
      data: null
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: 403,
        message: 'Invalid or expired token.',
        data: { authentication: false }
      });
    }

    req.user = decoded;
    next();
  });
}

module.exports = {
    register,
    login,
    isAllFilled,
    requireAuth
}