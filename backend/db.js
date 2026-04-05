import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI is not set in .env file!');
        console.error('   Please add your MongoDB Atlas connection string to backend/.env');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,  // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });

        isConnected = true;
        console.log('✅ MongoDB Atlas connected successfully');

        // Log database name
        const dbName = mongoose.connection.db.databaseName;
        console.log(`📦 Database: ${dbName}`);

    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.error('   Check your MONGODB_URI in backend/.env');
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected. Reconnecting...');
    isConnected = false;
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message);
    isConnected = false;
});

export default connectDB;
