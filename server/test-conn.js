require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  try {
    console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to Atlas');
    await mongoose.disconnect();
  } catch (e) {
    console.error('❌ Failed to connect:', e.message || e);
    process.exit(1);
  }
}

test();
