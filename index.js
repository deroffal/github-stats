const stats = require("./src/stats");
const github = require("./src/github-adapter")

const ownerName = "deroffal";

github.listLanguagesForUser(ownerName)
    .then((languages) => {
        let lang = languages.map(language => language.data);
        stats.agregateLanguage(lang);
    });


/****/
const languageMock = JSON.parse("[{\"Java\":56113,\"Kotlin\":12124},{\"Groovy\":23785,\"Kotlin\":12147},{\"Kotlin\":36439},{\"Kotlin\":10432},{\"Java\":75909,\"Groovy\":13558,\"Kotlin\":4240,\"HTML\":2485,\"JavaScript\":484},{},{\"Kotlin\":37778,\"Groovy\":16964},{\"Java\":391347,\"Groovy\":268746,\"CSS\":29980,\"XSLT\":13407,\"HTML\":7431},{\"Groovy\":6004},{\"Kotlin\":18225},{\"JavaScript\":4209},{\"HTML\":117268,\"Java\":6145},{\"PowerShell\":3867}]");

// [
//     { Java: 56113, Kotlin: 12124 },
//     { Groovy: 23785, Kotlin: 12147 },
//     { Kotlin: 36439 },
//     { Kotlin: 10432 },
//     {
//         Java: 75909,
//         Groovy: 13558,
//         Kotlin: 4240,
//         HTML: 2485,
//         JavaScript: 484
//     },
//     {},
//     { Kotlin: 37778, Groovy: 16964 },
//     { Java: 391347, Groovy: 268746, CSS: 29980, XSLT: 13407, HTML: 7431 },
//     { Groovy: 6004 },
//     { Kotlin: 18225 },
//     { JavaScript: 4209 },
//     { HTML: 117268, Java: 6145 },
//     { PowerShell: 3867 }
// ]
