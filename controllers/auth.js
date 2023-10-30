const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { nickname, password } = req.body;

        if (!nickname) {
            return res.status(400).json({
                success: false,
                error: "Nickname is required",
            });
        }

        if (!password || password.length < 6 || password.length > 64) {
            return res.status(400).json({
                success: false,
                error: "Password is required and should be of 6 - 64 characters",
            });
        }

        let userExist = await User.findOne({ nickname }).exec();
        if (userExist) {
            return res.status(400).json({
                success: false,
                error: "Nickname is already taken",
            });
        }

        //registering
        const user = new User({
            ...req.body,
        });

        await user.save();
        return res.json({
            success: true,
            message: "User created successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Error. Try again.",
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { nickname, password } = req.body;

        if (!nickname) {
            return res.status(400).json({
                success: false,
                error: "Nickname is required",
            });
        }
        if (!password || password.length < 6 || password.length > 64) {
            return res.status(400).json({
                success: false,
                error: "Password should be of 6-64 characters",
            });
        }

        const user = await User.findOne({ nickname }).exec();

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "No user found with this nickname. Please register first.",
            });
        }

        user.comparePassword(password, (err, match) => {
            if (!match || err) {
                return res.status(400).json({
                    success: false,
                    error: "You entered the wrong password.",
                });
            }

            //generate a token

            let token = jwt.sign(
                { _id: user._id },
                toString(process.env.JWT_SECRET),
                {
                    expiresIn: "1d",
                }
            );

            res.json({
                token,
                user: {
                    _id: user._id,
                    nickname: user.nickname,
                },
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Sign in failed",
        });
    }
};
