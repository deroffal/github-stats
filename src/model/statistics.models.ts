import {LanguageCount} from "./repositories.models";

export class Statistics {

    constructor(public ratioPerLanguage: Array<RatioPerLanguage>, public countPerMainLanguage: Array<LanguageCount>) {
    }

    getRatioForLanguage(name: string): string {
        return this.ratioPerLanguage.filter(rpl => rpl.name === name).shift()?.ratio || '0'
    }

    getCountAsMainLanguageFor(name: string): number {
        return this.countPerMainLanguage.filter(cpml => cpml.name === name).shift()?.count || 0
    }
}

export class RatioPerLanguage {

    constructor(public name: string, public ratio: string) {
    }
}
