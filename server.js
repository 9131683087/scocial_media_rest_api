import app from "./index.js"; // Make sure to use the correct import name for the Express app
import { connectToDb } from "./src/config/db.js";

// Start server and connect to database
const startServer = async () => {
  try {
    await connectToDb();
    app.listen(3000, () => {
      console.log(`Server is running at port 3000`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();
