const router = express.Router();
const MoviesService = require("../services/movies.service");
const service = new MoviesService();

router.get("/", async (req, res) => {
  const movies = await service.find();
  res.json(/**db movies */);
});

router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;
  const movies = await service.filterByGenre(genre);
  res.json(/**db movies */);
});

router.get("/title/:title", async (req, res) => {
  const { title } = req.params;
  const movie = await service.findByTitle(title);
  res.json(/**db movies */);
});

router.get("/year/:year", async (req, res) => {
  const { year } = req.params;
  const movies = await service.filterByYear(year);
  res.json(/**db movies */);
});

router.get("/ranking/:ranking", async (req, res) => {
  const { ranking } = req.params;
  const movies = await service.filterByRanking(ranking);
  res.json(/**db movies */);
});

router.post("/movie", async (req, res) => {
  const body = req.body;
  const newMovie = await service.add(body);
  // res.json(/**db movies */)
  // añade una peli
});

router.patch("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const movie = await service.update(id, body);
  // res.json(/**db movies */)
  // modifica una peli
});

router.delete("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await service.delete(id);
  res.json({
    message: "deleted",
    id,
  });
});

module.exports = router;
