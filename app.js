const express = require("express");
const request = require("request");
const path = require("path");

const parsing = require("./helpers/parse");
const nlp = require("./helpers/nlp");
const generation = require("./helpers/generation");

const app = express();
const port = 3000;

app.use(express.static("static"));
app.set("views", __dirname + "/templates");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/templates/index.html"));
});

app.get("/poem", async (req, res) => {
    request(req.query.page, (err, resp, body) => {
        cleanText = parsing.parse(body);

        entities = nlp.extractEntities(cleanText);
        title = nlp.extractTitle(entities.topics);
        sentiment = nlp.sentiment(cleanText);

        pos = nlp.getSimPOS(sentiment, cleanText);
        sentences = generation.createSentences(pos, entities);

        res.render("index", { sentences: sentences, title: title });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
