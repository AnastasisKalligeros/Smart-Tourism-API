const POI = require('../models/poi');

// Λειτουργία: Δημιουργία νέου σημείου ενδιαφέροντος (POI)
exports.createPOI = async (req, res) => {
    try {
        const poi = await POI.create(req.body);
        res.status(201).json(poi);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Λειτουργία: Εύρεση όλων των σημείων ενδιαφέροντος (POI)
exports.getAllPOIs = async (req, res) => {
    try {
        const pois = await POI.find();
        res.json(pois);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Λειτουργία: Εύρεση σημείων ενδιαφέροντος (POI) με βάση την κατηγορία
exports.getPOIsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const pois = await POI.find({ category });
        res.json(pois);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Λειτουργία: Ενημέρωση πληροφοριών ενός σημείου ενδιαφέροντος (POI)
exports.updatePOI = async (req, res) => {
    try {
        const poiId = req.params.poiId;
        const updatedPOI = await POI.findByIdAndUpdate(poiId, req.body, { new: true });
        res.json(updatedPOI);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Λειτουργία: Διαγραφή ενός σημείου ενδιαφέροντος (POI)
exports.deletePOI = async (req, res) => {
    try {
        const poiId = req.params.poiId;
        await POI.findByIdAndDelete(poiId);
        res.json({ message: "Το σημείο ενδιαφέροντος διαγράφηκε με επιτυχία." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
