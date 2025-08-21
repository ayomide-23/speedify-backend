// import express from "express";

const express = require("express");
const cors = require("cors");
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));

app.get("/api/ping", (req, res)=>{
    const start = process.hrtime();
    res.json({
        message: "pong",
        latency: process.hrtime(start)[1]
    });
});

app.get("/api/download", (req,res)=>{
    const size = parseInt(req.query.size) || 5 * 1024 * 1024;
    const buffer = Buffer.alloc(size, "a");
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Length", buffer.length);
    res.send(buffer);
});

app.post("/api/upload", (req,res)=>{
    const dataSize = Buffer.byteLength(JSON.stringify(req.body));
    res.json({
        message: "Upload received",
        data: dataSize
    });
});

app.listen(port, ()=>{
    console.log("server started");
});
