const express = require("express");
const routes = require("./routes");
const runMigrations = require("./database/sqlite/migrations");

const app = express();
app.use(express.json());
app.use(routes);

runMigrations();


app.use((error, request, response, next) => {
  if (error instanceof Error) {
    return response.status(400).json({
      error: error.message,
    });
  }
  
  console.error(error);
  return response.status(500).json({
    error: "Internal server error",
  });
});


const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
