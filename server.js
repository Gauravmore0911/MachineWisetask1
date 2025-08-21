


const mongoose = require('mongoose');

// --- MongoDB Connection ---
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

//  Mongoose model

// Schema for Sensor 
const SensorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['temperature', 'vibration', 'current', 'voltage'], required: true },
    unit: { type: String, required: true },
    minVal: { type: Number, default: 0 },
    maxVal: { type: Number, default: 100 },
    alertThreshold: { type: Number, default: 0 }
});
const Sensor = mongoose.model('Sensor', SensorSchema);

// Schema for historical Sensor Data 
const SensorDataSchema = new mongoose.Schema({
    sensorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sensor', required: true },
    value: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['temperature', 'vibration', 'current', 'voltage'], required: true }
});
const SensorData = mongoose.model('SensorData', SensorDataSchema);

//  Data store 


const generateSensorValue = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};

//  saving sensor data
setInterval(async () => {
    try {
        const sensors = await Sensor.find({});
        for (const sensor of sensors) {
            const value = parseFloat(generateSensorValue(sensor.minVal, sensor.maxVal));
            const newSensorData = new SensorData({
                sensorId: sensor._id,
                value: value,
                type: sensor.type,
                timestamp: new Date()
            });
            await newSensorData.save();
        }
        console.log('Generated and saved new sensor data.');
    } catch (err) {
        console.error('Error generating or saving sensor data:', err);
    }
}, 5000); // Save new data every 5 seconds

//  default sensors if none exist
const seedDefaultSensorsIfEmpty = async () => {
    try {
        const count = await Sensor.countDocuments();
        if (count === 0) {
            await Sensor.insertMany([
                { name: 'Machine Temperature', type: 'temperature', unit: '°C', minVal: 50, maxVal: 95, alertThreshold: 80 },
                { name: 'Machine Vibration', type: 'vibration', unit: 'mm/s', minVal: 5, maxVal: 30, alertThreshold: 20 },
                { name: 'Line Current', type: 'current', unit: 'A', minVal: 5, maxVal: 20, alertThreshold: 15 },
                { name: 'Line Voltage', type: 'voltage', unit: 'V', minVal: 210, maxVal: 250, alertThreshold: 240 }
            ]);
            console.log('Seeded default sensors.');
        }
    } catch (err) {
        console.error('Error seeding sensors:', err);
    }
};


seedDefaultSensorsIfEmpty();

console.log('Backend process for data generation and storage started.');