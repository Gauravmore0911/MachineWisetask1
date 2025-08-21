# Machine Sensor detection 

This project includes a Node.js + Express backend with MongoDB and a React (Vite) frontend. The backend generates random sensor data for configured sensors, streams live updates via Socket.io every 5 seconds, and stores all readings in MongoDB for historical queries. The frontend displays a live dashboard.

Approach and decisions:
- Backend defines two collections: `Sensor` (config and thresholds) and `SensorData` (historical readings). On startup it seeds default sensors if the DB is empty.
- Frontend connects to the Socket.io stream to render live cards and compute machine status: Critical if temperature > 80°C and vibration > 20 mm/s, Warning if either exceeds the limit, else Healthy. 

Production improvements:
- Add authentication and RBAC(role base acces controle), robust validation, rate limiting, and input sanitization.
- Move generator loop to a job queue or worker with backpressure.
- when the sitution are critical then the machine are dirctly stop there supply then machine has stop .

Getting started
1. Prerequisites: Node, MongoDB running locally 
2. Backend
   - cd backend
   - npm install
   - npm start
3. Frontend
   - cd frontend
   - npm install
   - npm run dev
4. Open the app at http://localhost:5173

API and Sockets
- REST: `GET/POST/PUT/DELETE /api/sensors` 
- Socket.io: server emits `sensorData` with a map of sensorId to the latest reading.


