export class Repository {

    constructor(public owner: string, public name: string) {
    }
}

export class LanguageCount {

    constructor(public name: string, public count: number) {
    }

    compareTo(other: LanguageCount) {
        return other.count - this.count
    }
}

export class LanguagesForRepository {

    constructor(public repository: Repository, public languages: Array<LanguageCount>) {
    }

}
