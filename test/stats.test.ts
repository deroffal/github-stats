import {aggregate, toPercent} from "../src/stats";
import {LanguagesForRepository, Repository} from "../src/models";


test('toPercent return the rounded percentage', () => {
    expect(toPercent(10, 20)).toBe("50")
    expect(toPercent(5, 15)).toBe("33")
    expect(toPercent(1, 100)).toBe("1")
})

test('aggregate calculates ratio per languages', () => {
    //given:
    let repo1 = new Repository("owner", "repo1")
    let lr1 = new LanguagesForRepository(repo1, new Map<string, number>([
        ['Java', 10],
        ['Javascript', 5],
        ['HTML', 7],
        ['CSS', 2]
    ]))
    let repo2 = new Repository("owner", "repo2")
    let lr2 = new LanguagesForRepository(repo2, new Map<string, number>([
        ['Kotlin', 100],
        ['Typescript', 50]
    ]))
    let repo3 = new Repository("owner", "repo3")
    let lr3 = new LanguagesForRepository(repo3, new Map<string, number>([
        ['Java', 50],
        ['Groovy', 50],
        ['Javascript', 10]
    ]))
    let languagesForRepository = [lr1, lr2, lr3]

    //when:
    let map = aggregate(languagesForRepository);

    //then:
    expect(map.size).toBe(7)

    expect(map.get('Java')).toEqual('21')
    expect(map.get('Javascript')).toEqual('5')
    expect(map.get('HTML')).toEqual('2')
    expect(map.get('CSS')).toEqual('1')
    expect(map.get('Kotlin')).toEqual('35')
    expect(map.get('Typescript')).toEqual('18')
    expect(map.get('Groovy')).toEqual('18')

});
