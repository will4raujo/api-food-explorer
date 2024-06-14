const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 3334;

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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
