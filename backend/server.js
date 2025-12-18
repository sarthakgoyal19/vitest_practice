import express from "express";
import cors from "cors";

const app = express();
const PORT = 5090;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running. Use POST /api/submit to submit form data.");
});

app.post("/api/submit", (req, res) => {
  const { firstName, lastName, phone } = req.body;
  console.log('Received data from frontend:', req.body);
  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if ((firstName + lastName).length < 8) {
    return res
      .status(400)
      .json({ error: "Full name must have at least 8 characters." });
  }

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Phone number must be 10 digits." });
  }

  res.json({
    user: { firstName, lastName, phone },
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
