import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Society from "../../models/Societies";
import Company from "../../models/Companies";
import dotenv from 'dotenv';

dotenv.config();
const jwt_secret = process.env.JWT_SECRET || 'secretkey';


export const companySignup = async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const existingUser = await Company.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "Company already exists" });
    }

    const hashedPass = await bcrypt.hash(pass, 10);
    const company = new Company({ name, email, password: hashedPass });
    await company.save();

    const token = jwt.sign({ email: company.email, id: company._id }, jwt_secret, { expiresIn: '1h' });
    return res.json({ company, token, message: 'Company signed up' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
};

export const companyLogin = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(200).json({ message: "Company doesn't exist" });
    }

    const isPassCorrect = await bcrypt.compare(pass, company.pass);
    if (!isPassCorrect) {
      return res.status(200).json({ message: "Password Incorrect" });
    }

    const token = jwt.sign({ email: company.email, id: company._id }, jwt_secret, { expiresIn: '1h' });
    res.json({ company, token, message: 'Company logged in' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
