const notFound = (req, res) => res.status(404).send("Route Doens't Exist");

module.exports = notFound;
