import jwt from 'jsonwebtoken';
import UserModel from '../feature/users/user.Schema.js';

const jwtAuth = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(payload.userID);

    if (!user) {
        return res.status(401).send('Unauthorized');
    }

    // Check if the token was issued before the last logout
    if (user.tokenInvalidationDate && payload.iat * 1000 < user.tokenInvalidationDate.getTime()) {
      return res.status(401).send('Unauthorized - Token is no longer valid');
    }

    req.userID = payload.userID;
    req.token = token;
  } catch (err) {
    console.log(err);
    return res.status(401).send('Unauthorized');
  }

  next();
};

export default jwtAuth;
