import "dotenv/config.js";
import app from "./src/app.js";
import connectdb from "./src/db/db.js";

connectdb()
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MonogoDB connection error", err);
    process.exit(1);
  });
