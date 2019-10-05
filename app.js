const express = require("express");
const request = require("request");
const path = require("path");

const parsing = require("./helpers/parse");
const nlp = require("./helpers/nlp");
const generation = require("./helpers/generation");

const app = express();
const port = 3000;

app.use(express.static("static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/templates/index.html"));
});

app.get("/poem", async (req, res) => {
    request(req.query.page, (err, resp, body) => {
        cleanText = parsing.parse(body);

        entities = nlp.extractEntities(cleanText);
        sentiment = nlp.sentiment(cleanText);

        pos = nlp.getSimPOS(sentiment, cleanText);
        generation.createSentences(pos, entities);
        // console.log(sentiment);
        console.log();

        // console.log(
        //     entities.orgs,
        //     entities.people,
        //     entities.places,
        //     entities.topics
        // );
        res.send("asdg");
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
