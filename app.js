const express = require('express');
const app = express();

app.get("/greetings", (req, res)=> {
    res.json({hiya:"Hello, stranger"});
});



// GET /quotes - return a list of quotes
app.get("/quotes", (req, res)=> {
    res.json(data);
});

// GET /quotes/:id - return a single quote with the specified id
app.get("/quotes/:id", (req, res)=> {
    const quote = data.quotes.find(quote => quote.id == req.params.id);
    res.json(quote);
});











app.listen(3000, () => console.log('Quote API listening on port 3000!'));



const data = {
    quotes: [
        {
            id:1111, 
            quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            author: "Nelson Mandela"
        },
        
        {
            id:1112,
            quote: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
        },

        {
            id:1113,
            quote: "If life were predictable it would cease to be life, and be without flavor.",
            author: "Eleanor Roosevelt"                       
        },

        {
            id:1114,
            quote: "Life is what happens when you're busy making other plans.",
            author: "John Lennon"
        },

        {
            id:1115,
            quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
            author: "Mother Teresa"
        }

    ]
}
