const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// this will handle the scores
app.post('/calculateRisk', (req, res) => {
    const { age, bmi, bloodPressure, familyHistory } = req.body;

    let riskScore = 0;

    // Age Risk Calculation
    if (age < 30) {
        riskScore += 0;
    } else if (age < 45) {
        riskScore += 10;
    } else if (age < 60) {
        riskScore += 20;
    } else {
        riskScore += 30;
    }

    // BMI Risk Calculation
    if (bmi < 25) {
        riskScore += 0;
    } else if (bmi < 30) {
        riskScore += 30;
    } else {
        riskScore += 75;
    }

    // Blood Pressure Risk Calculation
    if (bloodPressure < 120) {
        riskScore += 0;
    } else if (bloodPressure < 130) {
        riskScore += 15;
    } else if (bloodPressure < 140) {
        riskScore += 30;
    } else if (bloodPressure < 180) {
        riskScore += 75;
    } else {
        riskScore += 100;
    }

    // Family History Risk Calculation
    if (familyHistory.includes('diabetes')) {
        riskScore += 10;
    }
    if (familyHistory.includes('cancer')) {
        riskScore += 10;
    }
    if (familyHistory.includes('alzheimers')) {
        riskScore += 10;
    }

    // Determine the risk category
    let riskCategory = '';
    if (riskScore <= 20) {
        riskCategory = 'low risk';
    } else if (riskScore <= 50) {
        riskCategory = 'moderate risk';
    } else if (riskScore <= 75) {
        riskCategory = 'high risk';
    } else {
        riskCategory = 'uninsurable';
    }

    // Send the result back to the client
    res.json({ riskScore, riskCategory });
});

// Ping API to wake up the server
app.get('/ping', (req, res) => {
    res.send('Server is awake');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
