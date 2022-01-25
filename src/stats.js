function toPercent(count, total) {
    return (count * 100 / total).toFixed(0);
}

function agregateLanguage(json) {
    let map = new Map()
    let total = 0;
    json.forEach(languages => {
        let languagesAsMap = new Map(Object.entries(languages));
        languagesAsMap.forEach((count, language) => {

            let actual = map.get(language) || 0;
            map.set(language, actual + count);
            total += count;
        })
    })

    map.forEach((count, language) => {
        console.log(language + " : " + toPercent(count, total) + "%");
    });

    console.log(map);
    console.log("total : " + total);

}

exports.agregateLanguage = agregateLanguage;
