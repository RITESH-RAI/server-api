const express = require("express");
const connectDb = require("./config/db.js");
const employeeRoutes = require("./routes/employeeRoutes.js");

const app = express();
app.use(express.json());

app.use("/api", employeeRoutes);

const PORT = process.env.PORT || 3000;

// Connect to database then start server
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});

module.exports = app;