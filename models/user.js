const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        nickname: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            min: 6,
            max: 64,
            required: true,
        },
    },
    { timeseries: true }
);

userSchema.pre("save", function (next) {
    let user = this;

    if (user.isModified("password")) {
        return bcrypt.hash(user.password, 12, function (err, hash) {
            if (err) {
                console.log("Bcrypt hash err", err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            return next(err, false);
        }
        return next(null, match);
    });
};

module.exports = mongoose.model("User", userSchema);
