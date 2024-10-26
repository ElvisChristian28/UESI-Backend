const mongoose = require("mongoose");
const Program = require("../models/programs"); // assuming Program.js is the file where the model is defined

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/UESI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  const sampleData = Array.from({ length: 50 }, (_, i) => ({
    program_name: `Program ${i + 1}`,
    description: `This is the description for Program ${i + 1}. It's a comprehensive program designed to enhance skills and knowledge.`,
    start_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    end_date: new Date(2023, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1),
    program_status: ["Pending", "Active", "Completed"][Math.floor(Math.random() * 3)],
    location: `Location ${i + 1}, City ${i % 5 + 1}`,
  }));

  // Clear existing data and insert new data
  await Program.deleteMany({});
  await Program.insertMany(sampleData);

  console.log("50 sample records inserted into the Program collection");
  mongoose.connection.close();
});

// If there's an error during connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
