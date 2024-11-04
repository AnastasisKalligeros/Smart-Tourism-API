const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Διαδρομή: Δημιουργία νέου χρήστη
router.post('/users', userController.createUser);

// Διαδρομή: Λήψη όλων των χρηστών
router.get('/users', userController.getAllUsers);

// Διαδρομή: Λήψη ενός χρήστη βάσει email
router.get('/users/:email', userController.getUserByEmail);

// Διαδρομή: Ενημέρωση πληροφοριών ενός χρήστη
router.put('/users/:email', userController.updateUser);

// Διαδρομή: Διαγραφή ενός χρήστη
router.delete('/users/:email', userController.deleteUser);

module.exports = router;
