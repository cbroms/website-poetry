const rita = require("rita");

var exports = (module.exports = {});

exports.createSentences = (pos, entities) => {
    let sentences = [];

    for (let i = 0; i < 10; i++) {
        let randVerb =
            pos.verbs[Math.floor(Math.random() * (pos.verbs.length - 1)) + 1];
        randVerb = nlp(randVerb)
            .verbs()
            .toPastTense()
            .out("text");
        const randTopic =
            entities.topics[
                Math.floor(Math.random() * (entities.topics.length - 1)) + 1
            ];
        const randNoun =
            pos.nouns[Math.floor(Math.random() * (pos.nouns.length - 1)) + 1];

        const randAdverb =
            pos.adverbs[
                Math.floor(Math.random() * (pos.adverbs.length - 1)) + 1
            ];
        const randAdjective =
            pos.adjectives[
                Math.floor(Math.random() * (pos.adjectives.length - 1)) + 1
            ];

        let sentence = randTopic + " " + randVerb + " " + randNoun;
        sentences.push(sentence);
    }
    return sentences;
};
