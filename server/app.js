const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/flightDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.log(err));

// Uçuş şemasını oluştur
const flightSchema = new mongoose.Schema({
  flightNumber: Number,
  airlineCode: Number,
  departure: Date,
  arrival: Date,
  departureAirport: String,
  landingAirport: String,
});

const Flight = mongoose.model("Flight", flightSchema);

// Uçuş kaydetme endpoint'i
app.post("/api/book-flight", async (req, res) => {
  try {
    console.log("Received Flight Data:", req.body); // Make sure req is used
    const flightData = new Flight(req.body);
    await flightData.save();
    res.status(200).send("Uçuşunuz kaydedildi!");
  } catch (err) {
    console.error("Error saving flight:", err);
    res.status(500).send("Bir hata oluştu.");
  }
});

// Kullanıcının uçuşlarını listeleme endpoint'i
app.get("/api/my-flights", (req, res) => {
  // Correctly pass (req, res)
  Flight.find()
    .then((flights) => res.status(200).json(flights))
    .catch((err) => {
      console.error("Error retrieving flights:", err);
      res.status(500).send("Bir hata oluştu.");
    });
});

// Sunucuyu başlat
const PORT = 3001;
app.listen(PORT, () => console.log(`Sunucu ${PORT} numaralı portta çalışıyor`));
