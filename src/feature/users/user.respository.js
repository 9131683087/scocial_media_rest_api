import mongoose from "mongoose";
import UserModel from "./user.Schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export  default class UserRepository {

    // 1.Signup function
    async signUp(user) {
        try {
            // Create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (err) {
            console.error('Database error details:', err); // Detailed logging
            if (err instanceof mongoose.Error.ValidationError) {
                throw new Error(`Validation error: ${err.message}`);
            } else {
                throw new Error(`Database error: ${err.message}`);
            }
        }
    }

    // 2.Sign-in function
    async signIn(email, password) {
        try {
            const user = await UserModel.findOne({ email });

            // Check if user exists and password matches
            if (user && await bcrypt.compare(password, user.password)) {
                // Generate JWT token
                const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return { user, token };
            } else {
                throw new Error("Invalid email or password");
            }
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong with the database");
        }
    }

    // 3.Find user by email
    async findByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong with the database");
        }
    }

    // 4.Logout from the current device (invalidate tokens issued before now)
    async logout(userId) {
        try {
            // Update the tokenInvalidationDate for the user
            await UserModel.findByIdAndUpdate(userId, {
                tokenInvalidationDate: new Date()
            });
        } catch (err) {
            console.log(err);
            throw new Error("Failed to log out the user");
        }
    }

    // 5.Logout from all devices (same as the single device in this approach)
    async logoutAllDevices(userId) {
        try {
            // Update the tokenInvalidationDate for the user
            await UserModel.findByIdAndUpdate(userId, {
                tokenInvalidationDate: new Date()
            });
        } catch (err) {
            console.log(err);
            throw new Error("Failed to log out from all devices");
        }
    }

    // 6.Retrieve user details by userId
    async getUserById(userId) {
        try {
            // Find the user by userId and exclude the password field
            const user = await UserModel.findById(userId).select('-password');
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (err) {
            console.error('Database error details:', err); // Detailed logging
            throw new Error("Something went wrong with the database");
        }
    }

        // 7.Fetch all users without password field
        async findAllUsers() {
            try {
                // Find all users, excluding the password field
                return await UserModel.find({}, '-password');
            } catch (err) {
                throw new Error("Error fetching users: " + err.message);
            }
        }

        async updateUserDetails(userId, userUpdates) {
            try {
                // Ensure password is not updated unless provided
                if (userUpdates.password) {
                    // Hash new password if it's being updated
                    userUpdates.password = await bcrypt.hash(userUpdates.password, 10);
                }
    
                // 8.Update user details
                const updatedUser = await UserModel.findByIdAndUpdate(userId, userUpdates, {
                    new: true,
                    select: '-password' // Exclude password from response
                });
    
                if (!updatedUser) {
                    throw new Error('User not found');
                }
    
                return updatedUser;
            } catch (err) {
                console.error('Database error details:', err);
                throw err;
            }
        }
    
}


