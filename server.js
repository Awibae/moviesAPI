/*********************************************************************************
*  BTI425 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Alex Banigan Student ID: 151167202 Date: 2023-01-20
*  Cyclic Link: https://calm-lime-grasshopper-wear.cyclic.app
*   
********************************************************************************/ 

var express = require("express");
var app = express();
var cors = require("cors");
var dotenv = require('dotenv').config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

var HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", function(req, res){
    res.json({message: "API Listening"});
})

app.get("/api/movies", function(req, res){
    let page = req.query.page;
    let perPage = req.query.perPage;
    let title = req.query.title;
    db.getAllMovies(page, perPage, title).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    })
})

app.get("/api/movies/:id", function(req, res){
    db.getMovieById(req.params.id).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    })
})

app.post("/api/movies", function(req, res) {
    db.addNewMovie(req.body).then(function(data) {
        res.json(data);
    }).catch(function(err){
        res.json(err);
    })
})
app.put("/api/movies/:id", function(req, res){
    db.updateMovieById(req.body, req.params.id).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    })
})
app.delete("/api/movies/:id", function(req, res){
    db.deleteMovieById(req.params.id).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    })
})

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

