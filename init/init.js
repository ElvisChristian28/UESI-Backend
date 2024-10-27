const mongoose = require("mongoose");
const Program = require("../models/programs");
const Article = require("../models/articles");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/UESI");

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  const samplePrograms = Array.from({ length: 50 }, (_, i) => ({
    program_name: `Program ${i + 1}`,
    description: `This is the description for Program ${i + 1}. It's a comprehensive program designed to enhance skills and knowledge.`,
    start_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    end_date: new Date(2023, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1),
    program_status: ["Pending", "Active", "Completed"][Math.floor(Math.random() * 3)],
    location: `Location ${i + 1}, City ${i % 5 + 1}`,
  }));


  const sampleArticles = Array.from({ length: 15 }, (_, i) => ({
    title: `Article Title ${i + 1}`,
    content: `This is the content of Article ${i + 1}. It covers interesting topics and insights.`,
    published_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
}));

// Clear existing data and insert new articles
  await Article.deleteMany({});
  await Article.insertMany(sampleArticles);

console.log("15 sample records inserted into the Article collection");

  // Clear existing data and insert new programs
  await Program.deleteMany({});
  await Program.insertMany(samplePrograms);

  console.log("50 sample records inserted into the Program collection");
  mongoose.connection.close();
});

// If there's an error during connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
