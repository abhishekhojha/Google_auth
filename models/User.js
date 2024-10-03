const mongoose = require("mongoose")
const validator = require("validator")
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        require: [true, "Email is required"],
        validate: {
            validate: {
                validator: function (e) {
                    return validator.isEmail(e)
                },
                message: "Enter a valid email address"
            }
        }
    },
    role: { type: String, enum: ['student', 'teacher', 'superadmin'], default: 'student' },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

module.exports = User;