import {LanguagesForRepository} from "./models";

export function toPercent(count: number, total: number) {
    return (count * 100 / total).toFixed(0)
}

export function aggregate(languagesForRepository: LanguagesForRepository[]) {
    let totalPerLanguage = new Map<string, number>()

    languagesForRepository.forEach(languages => {
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
    return ratioPerLanguage;
}
