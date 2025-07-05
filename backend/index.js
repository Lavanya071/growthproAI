// Load environment variables from .env file
const express = require('express');
const cors = require('cors');

const app = express();

// Use PORT from .env or default to 5000
const PORT = 5000;

app.use(cors());
app.use(express.json());

const headlines = [
  "Why {name} is {location}'s Hidden Gem!",
  "{name}: The Future of Local Business in {location}",
  "{location}'s Top Pick: Discover {name} Today!",
  "Experience Excellence with {name} in {location}",
  "{name} in {location}: Where Quality Meets Service"
];

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;

  const rating = (Math.random() * 1 + 4).toFixed(1);
  const reviews = Math.floor(Math.random() * 200 + 50);
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  const headline = template.replace('{name}', name).replace('{location}', location);

  res.json({ rating, reviews, headline });
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  const template = headlines[Math.floor(Math.random() * headlines.length)];
  const headline = template.replace('{name}', name).replace('{location}', location);

  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});
