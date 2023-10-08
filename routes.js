const express = require("express");
const router = express.Router();
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

// get all quotes
router.get("/quotes", async (req, res) => {
  try {
    const quotes = await records.getQuotes();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a specific quote by ID
router.get("/quotes/:id", async (req, res) => {
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

router.get("/quotes/quote/random",asyncHandler (async (req, res) => {
    const quote = await records.getRandomQuote();
    res.json(quote);

}));

router.post(
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

// edit a quote
router.put(
  "/quotes/:id",
  asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      quote.quote = req.body.quote;
      quote.author = req.body.author;

      await records.updateQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "quote not found" });
    }
  })
);

// delete a quote
router.delete("/quotes/:id", async (req, res, next) => {
  try {
    throw new Error("oh lordy it done got broked");
    const quote = await records.getQuote(req.params.id);
    await records.deleteQuote(quote);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
