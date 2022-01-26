import {LanguageForRepository} from "./models";

function toPercent(count: number, total: number) {
    return (count * 100 / total).toFixed(0);
}

export function aggregate(languagesForRepository: LanguageForRepository[]) {
    let map = new Map()
    let total = 0;

    languagesForRepository.forEach(languages => {
        let languagesAsMap = languages.languages
        languagesAsMap.forEach((count, language) => {
            let actual = map.get(language) || 0;
            map.set(language, actual + count);
            total += count;
        })
    })

    map.forEach((count, language) => {
        console.log(language + " : " + toPercent(count, total) + "%");
    });

}

