const nlp = require("compromise");
const Sentiment = require("sentiment");
const rita = require("rita");

var exports = (module.exports = {});

// create an object with the entities in an array of strings
exports.extractEntities = text => {
    pe = [];
    or = [];
    pl = [];
    to = [];

    for (const sentence of text) {
        pe.push(
            nlp(sentence)
                .people()
                .out("array")
        );
        or.push(
            nlp(sentence)
                .organizations()
                .out("array")
        );
        pl.push(
            nlp(sentence)
                .places()
                .out("array")
        );
        to.push(
            nlp(sentence)
                .topics()
                .out("array")
        );
    }

    return {
        people: pe.flat(),
        orgs: or.flat(),
        places: pl.flat(),
        topics: to.flat()
    };
};

// get the mean sentiment of an array of strings and normalize on (-10, 10)
// randomly select a smaller portion of string to check to save time
exports.sentiment = text => {
    const samples = text.length <= 60 ? text.length : 60;
    let rands = [];
    for (let i = 0; i < samples; i++) {
        rands.push(Math.floor(Math.random() * (text.length - 1)) + 1);
    }

    const sentiment = new Sentiment();
    let total = 0;

    for (const rand of rands) {
        total += sentiment.analyze(text[rand]).comparative;
    }

    return Math.min(Math.max((total / samples) * 100, -10), 10);
};

// get nouns similar in sentiment to the text's overall sentiment
exports.getSimPOS = (senti, text) => {
    const sentiment = new Sentiment();
    const sentimentSign = Math.sign(senti);

    let res = { nouns: [], verbs: [], adverbs: [], adjectives: [] };

    for (const sentence of text) {
        const tokens = rita.tokenize(sentence);
        for (const token of tokens) {
            const scoreSign = Math.sign(sentiment.analyze(token).score);
            if (scoreSign == sentimentSign || scoreSign == 0) {
                if (rita.isNoun(token)) {
                    res.nouns.push(token);
                } else if (rita.isVerb(token)) {
                    res.verbs.push(token);
                } else if (rita.isAdverb) {
                    res.adverbs.push(token);
                } else if (rita.isAdjective) {
                    res.adjective.push(token);
                }
            }
        }
    }
    return res;
};
