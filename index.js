import express from "express";
import mongoose from "mongoose";
import path from "path";

const PORT = 5000 || process.env.PORT;
const __dirname = path.resolve();

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017/xperienceDB");

const mujSchema = new mongoose.Schema({
    name: String,
    email: String
});

const acmSchema = new mongoose.Schema({
    userName: String,
    email: String
});

const MUJ = mongoose.model("MUJ", mujSchema);
const ACM = mongoose.model("ACM", acmSchema);

app.get("/hello", (req, res) =>
    {
        res.sendFile(path.join(__dirname, "/public/hello.html"));
    }
);

app.get("/world", (req, res) =>
    {
        res.sendFile(path.join(__dirname, "/public/world.html"));
    }
);

app.get('*', (req, res) =>
    {
        res.sendFile(path.join(__dirname, "/public/404.html"));
    }
);

app.post("/muj", (req, res) =>
    {
        const muj = new MUJ({
            name: req.body.name,
            email: req.body.email
        });
        muj.save();
        res.redirect("/hello");
    }
);

app.post("/acm", (req, res) =>
    {
        const acm = new ACM({
            userName: req.body.username,
            email: req.body.email
        });
        acm.save();
        res.redirect("/world");
    }
);

app.listen(PORT, (req, res) =>
    {
        console.log("Listening on PORT " + PORT);
    }
);