export class Repository {
    owner: string
    name: string

    constructor(owner: string, name: string) {
        this.owner = owner;
        this.name = name;
    }
}

export class LanguageCount {
    name: string
    count: number

    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }

    compareTo(other: LanguageCount) {
        return other.count - this.count
    }
}

export class LanguagesForRepository {
    repository: Repository
    languages: Array<LanguageCount>

    constructor(repository: Repository, languages: Array<LanguageCount>) {
        this.repository = repository;
        this.languages = languages;
    }

}
