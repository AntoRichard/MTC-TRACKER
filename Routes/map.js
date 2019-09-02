const express = require('express');
const fetch = require("node-fetch");

const Route = express.Router();

Route.get('/map',async (req,res)=>{
    const response = await fetch('https://mtc-conductor.firebaseio.com/seats.json',{method:"GET"});
    const data = await response.json();
    const keys = Object.keys(data).map(key => data[key]);
    let totalSeats = 0;
    keys.forEach(key =>{
        totalSeats+=key.value;
    });
    totalSeats = 50-totalSeats;
    if(totalSeats<0){
        totalSeats = 0;
    }
    console.log(totalSeats);
    res.render('map',{
        seats : totalSeats,
        price : keys[(keys.length)-1].price
    });
    // console.log(keys[(keys.length)-1].price);
});

module.exports = Route;