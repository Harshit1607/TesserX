import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Society from '../../models/Societies';
import Company from '../../models/Companies';
import dotenv from 'dotenv';

dotenv.config();
const jwt_secret = process.env.JWT_SECRET || 'secretkey';

export const societySignup = async (req: Request, res: Response) => {
  const { name, email, pass, college } = req.body;

  try {
    const existingUser = await Society.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'Society already exists' });
    }

    const hashedPass = await bcrypt.hash(pass, 10);
    const society = new Society({ name, email, password: hashedPass, college });
    await society.save();

    const token = jwt.sign({ email: society.email, id: society._id }, jwt_secret, { expiresIn: '1h' });
    return res.json({ society, token, message: 'Society signed up' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
};

export const societyLogin = async (req: Request, res: Response) => {
  const { email, pass } = req.body;

  try {
    const society = await Society.findOne({ email });
    if (!society) {
      return res.status(200).json({ message: "Society doesn't exist" });
    }

    const isPassCorrect = await bcrypt.compare(pass, society.pass); // ✅ Corrected field
    if (!isPassCorrect) {
      return res.status(200).json({ message: 'Password Incorrect' });
    }

    const token = jwt.sign({ email: society.email, id: society._id }, jwt_secret, { expiresIn: '1h' });
    res.json({ society, token, message: 'Society logged in' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
