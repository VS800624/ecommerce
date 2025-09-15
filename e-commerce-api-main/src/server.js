require('dotenv').config();
const app = require('.');
const { connectDb } = require('./config/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`Server running on port: ${PORT}`);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
});
