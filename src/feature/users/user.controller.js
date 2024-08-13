import UserRepository from "./user.respository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // 1.Sign-up function
    async signUp(req, res, next) {
        const { name, email, password, gender, bio } = req.body;
        try {
            // Prepare user data
            const user = {
                name,
                email,
                password,
                gender,
                bio,
            };

            // Save the user using the repository
            const newUser = await this.userRepository.signUp(user);

                        res.status(201).send({
                message: "User successfully created. Well done!",status: 201,
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    gender: newUser.gender,
                    bio: newUser.bio,
                }
            });
        } catch (err) {
            next(err);
        }
    }

    // 2.Sign-in function
    async signIn(req, res, next) {
        try {
            // Find user by email using the repository
            const user = await this.userRepository.findByEmail(req.body.email);
            if (!user) {
                return res.status(400).send('Incorrect Credentials');
            }

            // Compare provided password with the hashed password in the database
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).send('Incorrect Credentials');
            }

            // Create a JWT token
            const token = jwt.sign(
                {
                    userID: user._id,
                    email: user.email,
                },
                process.env.JWT_SECRET, // Use an environment variable for the secret
                {
                    expiresIn: '1h',
                }
            );

            // Respond with the token
            return res.status(200).send({ token });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    // 3.Logout from the current device
    async logout(req, res, next) {
        try {
            const userId = req.userID;

            if (!userId) {
                return res.status(401).send({ message: "No user is logged in" });
            }

            // Use repository method to log out the user
            await this.userRepository.logout(userId);

            res.status(200).send({ message: "Logged out successfully from the current device" });
        } catch (err) {
            next(err);
        }
    }

    // 4.Logout from all devices
    async logoutAllDevices(req, res, next) {
        try {
            const userId = req.userID;

            if (!userId) {
                return res.status(401).send({ message: "No user is logged in" });
            }

            // Use repository method to log out from all devices
            await this.userRepository.logoutAllDevices(userId);

            res.status(200).send({ message: "Logged out successfully from all devices" });
        } catch (err) {
            next(err);
        }
    }

     // 5.Get user details by userId
     async getUserDetails(req, res, next) {
        const { userId } = req.params;
        try {
            // Fetch user details using the repository
            const user = await this.userRepository.getUserById(userId);
            
            // Respond with the user details
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    // 6.Get all user details
    async getAllUserDetails(req, res, next) {
        try {
            // Fetch all users
            const users = await this.userRepository.findAllUsers();
            
            // Respond with the user data
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

      // 7.Update user details
      async updateDetails(req, res, next) {
        const { userId } = req.params;
        const userUpdates = req.body;

        try {
            // Update user details
            const updatedUser = await this.userRepository.updateUserDetails(userId, userUpdates);

            // Respond with the updated user details (excluding the password)
            res.status(200).send({
                name: updatedUser.name,
                email: updatedUser.email,
                gender: updatedUser.gender,
                bio: updatedUser.bio,
            });
        } catch (err) {
            next(err);
        }
    }

}
