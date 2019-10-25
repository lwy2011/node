import express from "express";

const app = express();


app.listen(3000, () => {
    console.log("listening");
});

app.get("/", (req, res) => {
    res.end(`<h1>test</h1>`);
});