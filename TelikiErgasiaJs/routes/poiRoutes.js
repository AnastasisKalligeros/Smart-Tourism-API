const express = require('express');
const router = express.Router();
const poiController = require('../controllers/poiController');

// Διαδρομή: Δημιουργία νέου σημείου ενδιαφέροντος (POI)
router.post('/pois', poiController.createPOI);

// Διαδρομή: Λήψη όλων των σημείων ενδιαφέροντος (POI)
router.get('/pois', poiController.getAllPOIs);

// Διαδρομή: Λήψη σημείων ενδιαφέροντος (POI) βάσει κατηγορίας
router.get('/pois/:category', poiController.getPOIsByCategory);

// Διαδρομή: Ενημέρωση πληροφοριών ενός σημείου ενδιαφέροντος (POI)
router.put('/pois/:poiId', poiController.updatePOI);

// Διαδρομή: Διαγραφή ενός σημείου ενδιαφέροντος (POI)
router.delete('/pois/:poiId', poiController.deletePOI);

module.exports = router;
