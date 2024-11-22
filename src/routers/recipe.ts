import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // TODO: get all recipes
  res.send("get hello world!");
});

router.get("/:id?", (req, res) => {
  // TODO: get a recipe
  const idQuery = req.query.id ?? "blank";
  console.log(idQuery);
  if (req.params.id) {
    res.send("get hello " + req.params.id);
  } else {
    res.send("get hello world!");
  }
});

router.post("/", (req, res) => {
  // TODO: create a recipe
  const jsonData = req.body;

  res.send(`post hello world! ${JSON.stringify(jsonData)}`);
});

router.put("/:id", (req, res) => {
  // TODO: edit a recipe
  res.send("put hello world!");
});

router.delete("/:id", (req, res) => {
  // TODO: delete a recipe
  res.send("delete hello world!");
});

export default router;
