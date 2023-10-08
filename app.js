const express = require("express");
const app = express();

const records = require("./records");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

app.use(express.json());

// GET routes

// get all quotes
app.get("/quotes", async (req, res) => {
  try {
    const quotes = await records.getQuotes();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a specific quote by ID
app.get("/quotes/:id", async (req, res) => {
  try {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ message: "quote not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST routes

// Add a single quote
// app.post("/quotes", async (req, res) => {

//     try{
//         if(req.body.author && req.body.quote){
//             const quote = await records.createQuote({
//                 quote: req.body.quote,
//                 author: req.body.author
//             });
//             res.status(201).json(quote);

//         }else {
//             res.status(400).json({message :"quote and author required" })
//         }

//     }catch(err){
//         res.status(500).json({message: err.message})
//     }

// });

app.post(
  "/quotes",
  asyncHandler(async (req, res) => {
    if (req.body.author && req.body.quote) {
      const quote = await records.createQuote({
        quote: req.body.quote,
        author: req.body.author,
      });
      res.status(201).json(quote);
    } else {
      res.status(400).json({ message: "quote and author required" });
    }
  })
);

// PUT routes

// edit a quote
app.put("/quotes/:id", asyncHandler (async (req, res) => {
  
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      quote.quote = req.body.quote;
      quote.author = req.body.author;

      await records.updateQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "quote not found" });
    }        
}));

// DELETE Routes

// delete a quote
app.delete("/quotes/:id", async (req, res, next) => {
  try {
    throw new Error("oh lordy it done got broked");
    const quote = await records.getQuote(req.params.id);
    await records.deleteQuote(quote);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(3000, () => console.log("Quote API listening on port 3000!"));
