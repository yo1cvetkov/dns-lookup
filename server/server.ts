import * as express from "express";
import * as dns from "dns";
import * as cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/lookup", (req, res) => {
  const { domain } = req.query;

  dns.resolve4(domain as string, (err, addresses) => {
    if (err) {
      res.status(500).send("Greška pri pronalasku IP adrese unetog domena.");
    } else if (addresses.length > 0) {
      res.json({ addresses });
    } else {
      res.status(404).send("Nije pronađena IP adresa unetog domena.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server je na http://localhost:${PORT}`);
});
