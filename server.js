// 1. THIS MUST GO FIRST - It loads env variables before any other imports execute
import 'dotenv/config'; 

// 2. Now these can safely use your process.env variables
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { initMQTT } from './src/services/mqtt.service.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    initMQTT();

    app.listen(PORT, () => {
      console.log(`⚡ LUMINEST active on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();