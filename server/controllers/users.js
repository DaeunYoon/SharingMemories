import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


import User from '../models/user.js';


export const signin = async (req, res) => {
    dotenv.config();
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            res.status(404).json({ message: 'User doesn\'t exist.' });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'Incorrect password.' });
            return;
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
        console.log(e);
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'User already exists.' });
            return;
        }

        if (password !== confirmPassword) {
            res.status(400).json({ message: 'Passwords do not match.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            picture: '',
        });

        newUser.save();

        const token = jwt.sign({ email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: newUser, token });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
        console.log(e);
    }
};