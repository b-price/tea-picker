import express from "express";
import bcrypt from "bcryptjs";
import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();

// user registration
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        let collection = await db.collection("users");
        let emailExists = await collection.findOne({email: email});
        if (emailExists) {
            res.send("Email already exists");
        } else if (!email) {
            res.send("No email");
        }
        else {
            bcrypt.hash(password, 10).then(async hash => {
                const user = {
                    email: email,
                    password: hash,
                    preferences: { darkMode: true, favoriteMode: false },
                    presets: [],
                };
                let result = await collection.insertOne(user);
                res.send(result).status(204);
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding user");
    }
});

//user login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let collection = await db.collection("users");
        const user = await collection.findOne({ email });
        if (!user) res.send("Email does not exist").status(404);
        else {
            bcrypt.compare(password, user.password).then(result => {
                result? res.send(user).status(404) : res.send("Incorrect password").status(400);
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in.");
    }
})

//user update settings
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        let updates = {}
        if (req.body.password){
            bcrypt.hash(req.body.password, 10).then(async hash => {
                updates = {
                    $set: {
                        email: req.body.email,
                        password: hash,
                        preferences: req.body.preferences,
                        presets: req.body.presets,
                    },
                };
            })
        } else {
            updates = {
                $set: {
                    email: req.body.email,
                    password: req.body.password,
                    preferences: req.body.preferences,
                    presets: req.body.presets,
                },
            };
        }

        let collection = await db.collection("users");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("users");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
});

export default router;