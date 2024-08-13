import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User Schema for a Social Media Platform
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [50, "Name can't be greater than 50 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
            },
            message: "Password should be between 8-12 characters and have at least one special character"
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    bio: {
        type: String,
        maxLength: [160, "Bio can't be greater than 160 characters"],
        default: ''
    },
    tokenInvalidationDate: {
        type: Date,
        default: null // Will be set when the user logs out
    }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Create the User model from the schema
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
