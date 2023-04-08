import "reflect-metadata"
import configureApp from "./app";
import configValues from "./configs/config";
import AppDataSource from "./database/data-source";

const PORT = configValues.APP_PORT;

// Setup database connection
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = configureApp();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
