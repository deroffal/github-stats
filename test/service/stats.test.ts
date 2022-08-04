import {aggregate, toPercent} from "../../src/service/stats";
import {LanguageCount, LanguagesForRepository, Repository} from "../../src/model/repositories.models";


test('toPercent return the rounded percentage', () => {
    expect(toPercent(10, 20)).toBe("50.00")
    expect(toPercent(5, 15)).toBe("33.33")
    expect(toPercent(1, 100)).toBe("1.00")
})

test('aggregate calculates ratio per languages', () => {
    //given:
    let repo1 = new Repository("owner", "repo1")
    let lr1 = new LanguagesForRepository(repo1, [
        new LanguageCount('Java', 10),
        new LanguageCount('Javascript', 5),
        new LanguageCount('HTML', 7),
        new LanguageCount('CSS', 2)])
    let repo2 = new Repository("owner", "repo2")
    let lr2 = new LanguagesForRepository(repo2, [
        new LanguageCount('Kotlin', 100),
        new LanguageCount('Typescript', 50)
    ])
    let repo3 = new Repository("owner", "repo3")
    let lr3 = new LanguagesForRepository(repo3, [
        new LanguageCount('Java', 50),
        new LanguageCount('Groovy', 50),
        new LanguageCount('Javascript', 10)
    ])
    let languagesForRepository = [lr1, lr2, lr3]

    //when:
    let statistics = aggregate(languagesForRepository);
    let ratioPerLanguage = statistics.ratioPerLanguage;
    let countPerMainLanguage = statistics.countPerMainLanguage;

    //then:
    expect(ratioPerLanguage).toHaveLength(7)

    expect(statistics.getRatioForLanguage('Java')).toEqual('21.13')
    expect(statistics.getRatioForLanguage('Javascript')).toEqual('5.28')
    expect(statistics.getRatioForLanguage('HTML')).toEqual('2.46')
    expect(statistics.getRatioForLanguage('CSS')).toEqual('0.70')
    expect(statistics.getRatioForLanguage('Kotlin')).toEqual('35.21')
    expect(statistics.getRatioForLanguage('Typescript')).toEqual('17.61')
    expect(statistics.getRatioForLanguage('Groovy')).toEqual('17.61')

    //and:
    expect(countPerMainLanguage).toHaveLength(2)

    expect(statistics.getCountAsMainLanguageFor('Java')).toEqual(2)
    expect(statistics.getCountAsMainLanguageFor('Kotlin')).toEqual(1)

});
