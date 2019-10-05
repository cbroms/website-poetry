const rita = require("rita");

var exports = (module.exports = {});

exports.createSentences = (pos, entities) => {
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

        let sentence = randTopic + " " + randVerb + " " + randNoun;

        // sentence = nlp(sentence)
        //     .verbs()
        //     .toPastTense()
        //     .out("text");
        console.log(sentence);
    }
};
