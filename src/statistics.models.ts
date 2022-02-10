import {LanguageCount} from "./repositories.models";

export class Statistics {
    ratioPerLanguage: Array<RatioPerLanguage>
    countPerMainLanguage: Array<LanguageCount>

    constructor(ratioPerLanguage: Array<RatioPerLanguage>, countPerMainLanguage: Array<LanguageCount>) {
        this.ratioPerLanguage = ratioPerLanguage;
        this.countPerMainLanguage = countPerMainLanguage;
    }

    getRatioForLanguage(name: string): string {
        return this.ratioPerLanguage.filter(rpl => rpl.name === name).shift()?.ratio || '0'
    }

    getCountAsMainLanguageFor(name: string): number {
        return this.countPerMainLanguage.filter(cpml => cpml.name === name).shift()?.count || 0
    }
}

export class RatioPerLanguage {
    name: string
    ratio: string

    constructor(name: string, ration: string) {
        this.name = name;
        this.ratio = ration;
    }
}
