import {LanguagesForRepository, Statistics} from "./models";

export function toPercent(count: number, total: number) {
    return (count * 100 / total).toFixed(0)
}

export function aggregate(languagesForRepository: LanguagesForRepository[]): Statistics {
    let totalPerLanguage = new Map<string, number>()
    let countPerMainLanguage = new Map<string, number>()

    languagesForRepository.forEach(languages => {

        let mainLanguage = languages.getMainLanguage();
        if (mainLanguage) {
            let coutForLanguage = countPerMainLanguage.get(mainLanguage) || 0
            countPerMainLanguage.set(mainLanguage, coutForLanguage + 1)
        }


        let languagesAsMap = languages.languages
        languagesAsMap.forEach((count, language) => {
            let actual = totalPerLanguage.get(language) || 0
            totalPerLanguage.set(language, actual + count)
        })
    })

    let total = Array.from(totalPerLanguage.values()).reduce((acc, count) => acc + count, 0)

    let ratioPerLanguage = new Map<string, string>()
    totalPerLanguage.forEach((count, language) => {
        let percentage = toPercent(count, total);
        ratioPerLanguage.set(language, percentage)
    });
    return new Statistics(ratioPerLanguage, countPerMainLanguage);
}
