const express = require('express');
const fetch = require("node-fetch");

const Route = express.Router();

Route.get('/map',async (req,res)=>{
    // fetch('https://mtc-conductor.firebaseio.com/seats.json',{method:"GET"})
    // .then(res => res.json())
    // .then(data =>console.log(data));
    const response = await fetch('https://mtc-conductor.firebaseio.com/seats.json',{method:"GET"});
    const data = await response.json();
    const keys = Object.keys(data).map(key => data[key]);
    let totalSeats = 0;
    keys.forEach(key =>{
        totalSeats+=key.value;
    });
    console.log(totalSeats);
    res.render('map',{
        seats : totalSeats
    });
});

module.exports = Route;