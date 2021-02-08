const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

// mongoose.connect(
//   process.env.MONGODB_CONNECTION_STRING,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("MongoDB connection established");
//   }
// );

//mongoose.connect('mongodb://127.0.0.1:27017/mernjwtauth', { useNewUrlParser: true });

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://User-Arurian:Userarun@123@cluster0.vsieu.mongodb.net/restApp?retryWrites=true&w=majority", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


// set up routes

app.use("/users", require("./routes/users"));
app.use("/todos", require("./routes/todo"));