const express = require('express');
const app = express();

const records = require("./records");

app.use(express.json());

// GET routes

// get all quotes
app.get("/quotes", async (req, res)=> {

    try{
        const quotes =  await records.getQuotes();
        res.json(quotes);

    }catch(err){
        res.status(500).json({message: err.message})
    }
    
});

// get a specific quote by ID
app.get("/quotes/:id", async (req, res)=> {

    try{
        const quote = await records.getQuote(req.params.id);
        if(quote){
          res.json(quote);  
        }else {
            res.status(404).json({message: "quote not found"})
        }
        

    }catch(err){
        res.status(500).json({message: err.message})
    }
    
});


// POST routes

// Add a single quote
app.post("/quotes", async (req, res) => {

    try{
        if(req.body.author && req.body.quote){
            const quote = await records.createQuote({
                quote: req.body.quote,
                author: req.body.author 
            });
            res.status(201).json(quote);

        }else {
            res.status(400).json({message :"quote and author required" })
        }
        

    }catch(err){
        res.status(500).json({message: err.message})
    }
    
});






app.listen(3000, () => console.log('Quote API listening on port 3000!'));