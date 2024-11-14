const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Body parser for form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, '../client')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://gnani:gnani@cluster0.jimeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// Define Patient Schema and Model
const patientSchema = new mongoose.Schema({
    name: String,
    gender: String,
    examDate: Date,
    address: String,
    mrNo: String,
    mobileNo: String,
    age: Number,
    complaint: String,
    rightEyePower: String,
    leftEyePower: String,
    addPower: String,
    diagnosis: String
});

const Patient = mongoose.model('Patient', patientSchema);

// Route to save patient data
app.post('/submitPatientData', async (req, res) => {
    try {
        const patientData = new Patient(req.body);
        await patientData.save();
        res.redirect('/receipt.html');
    } catch (error) {
        res.status(500).send("Error saving data.");
    }
});

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Use the environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
