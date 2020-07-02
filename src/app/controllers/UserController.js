import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Log from '../schemas/Log';
import User from '../schemas/User';

import { v4 as uuid } from 'uuid';

import UserSignInValidation from '../validations/UserSignInValidation';
import UserSignUpValidation from '../validations/UserSignUpValidation';

import { encryptPassword, checkPassword } from '../utils/passwordUtil';

class UserController {
  async signUp(req, res) {
    try {
      await UserSignUpValidation.validate(req.body, { abortEarly: true });
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new Error(`User ${name} (${email}) already exists`);
      }

      const user = await User.create({
        name,
        email,
        password: await encryptPassword(password),
      });

      Log.create({
        _id: uuid(),
        user_id: user._id,
        description: `User signed up`,
        ip_address: req.connection.remoteAddress,
      });
      return res.json(user);
    } catch (err) {
      Log.create({
        _id: uuid(),
        description: `Sign up fails. ${err}`,
        ip_address: req.connection.remoteAddress,
        error: true,
      });
      return res.status(400).json({ error: `Sign up fails. ${err}` });
    }
  }

  async signIn(req, res) {
    try {
      await UserSignInValidation.isValid(req.body);

      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        throw new Error('This user was not found');
      }

      if (!(await checkPassword(user.password, password))) {
        throw new Error('Password not match');
      }

      Log.create({
        _id: uuid(),
        user_id: user._id,
        description: `User signed in.`,
        ip_address: req.connection.remoteAddress,
      });
      return res.json({
        user,
        token: jwt.sign({ id: user._id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      Log.create({
        _id: uuid(),
        description: `Sign in failed. ${err}`,
        ip_address: req.connection.remoteAddress,
        error: true,
      });
      return res
        .status(400)
        .json({ error: true, message: `Sign in failed. ${err}` });
    }
  }

  async signOut(req, res) {
    return res.json({ message: `You're logged out` });
  }
}

export default new UserController();
