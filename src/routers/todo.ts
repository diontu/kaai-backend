import express from "express";
const router = express.Router();

router.get("/:id?", (req, res) => {
  const idQuery = req.query.id ?? "blank";
  console.log(idQuery);
  if (req.params.id) {
    res.send("get hello " + req.params.id);
  } else {
    res.send("get hello world!");
  }
});

router.post("/", (req, res) => {
  const jsonData = req.body;

  res.send(`post hello world! ${JSON.stringify(jsonData)}`);
});

router.put("/:id", (req, res) => {
  res.send("put hello world!");
});

router.delete("/:id", (req, res) => {
  res.send("delete hello world!");
});

export default router;
