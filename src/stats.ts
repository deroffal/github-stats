import {LanguageCount, LanguagesForRepository} from "./repositories.models";
import {RatioPerLanguage, Statistics} from "./statistics.models";

export function toPercent(count: number, total: number) {
    return (count * 100 / total).toFixed(2)
}

function computeRatioPerLanguage(totalPerLanguage: Map<string, number>, totalLines: number) {
    return Array.from(totalPerLanguage.entries())
        .map(countPerLanguage => {
            let language = countPerLanguage[0];
            let count = countPerLanguage[1];
            return new RatioPerLanguage(language, toPercent(count, totalLines));
        });
}

function countLines(totalPerLanguage: Map<string, number>) {
    return Array.from(totalPerLanguage.values())
        .reduce((acc, count) => acc + count, 0);
}

function computeCountPerMainLanguage(cpml: Map<string, number>) {
    return Array.from(cpml.entries())
        .map(countPerLanguage => new LanguageCount(countPerLanguage[0], countPerLanguage[1]));
}

function getMainLanguage(languagesForRepository: LanguagesForRepository): string | undefined {
    return [...languagesForRepository.languages]
        .sort((a, b) => a.compareTo(b))
        .shift()
        ?.name
}


export function aggregate(languagesForRepository: LanguagesForRepository[]): Statistics {
    let totalPerLanguage = new Map<string, number>()
    let cpml = new Map<string, number>()

    languagesForRepository.forEach(languages => {

        let mainLanguage = getMainLanguage(languages);
        if (mainLanguage) {
            let coutForLanguage = cpml.get(mainLanguage) || 0
            cpml.set(mainLanguage, coutForLanguage + 1)
        }


        let languagesAsMap = languages.languages
        languagesAsMap.forEach(countPerLanguage => {
            let language = countPerLanguage.name;
            let actual = totalPerLanguage.get(language) || 0
            totalPerLanguage.set(language, actual + countPerLanguage.count)
        })
    })

    let total = countLines(totalPerLanguage)
    let ratioPerLanguage = computeRatioPerLanguage(totalPerLanguage, total);
    let countPerMainLanguage = computeCountPerMainLanguage(cpml);

    return new Statistics(ratioPerLanguage, countPerMainLanguage);
}
