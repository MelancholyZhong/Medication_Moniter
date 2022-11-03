//Yao Zhong

//vercel deployment configuration considered https://github.com/ngduc/vercel-express/blob/master/vercel.json
// but made a lot of resaerch to make it finally work.

const express = require("express");
// const bodyParser = require("body-parser");
const mongoUtil = require("./mongoUtil");

const app = express();
const port = 3000;

//importing the different routes
const queryRoutes = require("./routes/query-routes");
const monitorRoutes = require("./routes/monitor-routes");
const refillRoutes = require("./routes/refill-routes");
const restockRoutes = require("./routes/restock-routes");
const loginRoutes = require("./routes/login-routes");

//connect to the database when the project starts
mongoUtil.connectToClient();

// with help of body parser, we can use req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("./public"));

app.use("/api/query", queryRoutes);

app.use("/api/monitor", monitorRoutes);

app.use("/api/refill", refillRoutes);

app.use("/api/restock", restockRoutes);

app.use("/api/login", loginRoutes);

app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`Server runing at port ${port}`);
});

module.exports = app;
