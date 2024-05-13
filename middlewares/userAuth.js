import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
function authenticateUserToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
              next();
            }else{
              req.user = decodedToken;
              next();
            }
        

          });
    }else{
        next();
    }
  
    
  }
  export default authenticateUserToken;