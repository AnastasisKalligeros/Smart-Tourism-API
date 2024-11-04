const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0/smart_tourism", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.error("Error:", err);
});


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        set: (email) => email.toLowerCase()
    }
});

const User = mongoose.model('User', userSchema);

const poiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    photo: String
});

const POI = mongoose.model('POI', poiSchema);

const checkAgeMiddleware = (req, res, next) => {
    const { age } = req.body;

    if (isNaN(age)) {
        return res.status(400).json({ error: "Η ηλικία πρέπει να είναι αριθμός." });
    }

    if (parseInt(age) < 18) {
        return res.status(400).json({ error: "Πρέπει να είστε άνω των 18 ετών για να εγγραφείτε." });
    }
    next();
};

app.post("/smart_tourism/users", checkAgeMiddleware, async (req, res) => {
    try {
        if (!req.body.name || !req.body.age || !req.body.email) {
            return res.status(400).json({ error: "Τα πεδία όνομα, ηλικία και email είναι υποχρεωτικά." });
        }
        
        req.body.email = req.body.email.toLowerCase();

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Το email χρησιμοποιείται ήδη." });
        }

        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/smart_tourism/users", async (req, res) => {
    try {
        const users = await User.find({}, { name: 1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/smart_tourism/users/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email }, { name: 1 });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/smart_tourism/pois", async (req, res) => {
    try {
        const poi = await POI.create(req.body);
        res.status(201).json(poi);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/smart_tourism/pois", async (req, res) => {
    try {
        const pois = await POI.find();
        res.json(pois);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/smart_tourism/pois/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const pois = await POI.find({ category });
        res.json(pois);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User Information
app.put("/smart_tourism/users/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const updatedUser = await User.findOneAndUpdate({ email: email }, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update POI Information
app.put("/smart_tourism/pois/:poiId", async (req, res) => {
    try {
        const poiId = req.params.poiId;
        const updatedPOI = await POI.findByIdAndUpdate(poiId, req.body, { new: true });
        res.json(updatedPOI);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User by Email
app.delete("/smart_tourism/users/:email", async (req, res) => {
    try {
        const email = req.params.email;
        await User.findOneAndDelete({ email });
        res.json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete POI
app.delete("/smart_tourism/pois/:poiId", async (req, res) => {
    try {
        const poiId = req.params.poiId;
        await POI.findByIdAndDelete(poiId);
        res.json({ message: "POI deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
