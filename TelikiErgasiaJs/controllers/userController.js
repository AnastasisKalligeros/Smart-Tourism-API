const User = require('../models/user');

// Λειτουργία: Δημιουργία νέου χρήστη
exports.createUser = async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "Το email χρησιμοποιείται ήδη." });
        }

        const newUser = new User({ name, age, email });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Λειτουργία: Εύρεση όλων των χρηστών
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Λειτουργία: Εύρεση ενός χρήστη βάσει του email
exports.getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email }, { name: 1, email: 1 });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Λειτουργία: Ενημέρωση πληροφοριών ενός χρήστη
exports.updateUser = async (req, res) => {
    try {
        const email = req.params.email;
        const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Λειτουργία: Διαγραφή ενός χρήστη
exports.deleteUser = async (req, res) => {
    try {
        const email = req.params.email;
        await User.findOneAndDelete({ email });
        res.json({ message: "Ο χρήστης διαγράφηκε με επιτυχία." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
