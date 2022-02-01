export class Repository {
    owner: string
    name: string

    constructor(owner: string, name: string) {
        this.owner = owner;
        this.name = name;
    }
}

export class LanguagesForRepository {
    repository: Repository
    languages: Map<string, number>

    constructor(repository: Repository, languages: Map<string, number>) {
        this.repository = repository;
        this.languages = languages;
    }

    getMainLanguage(): string | null {
        if (this.languages.size == 0) {
            return null
        }
        return Array.from(this.languages.entries()).sort((a, b) => b[1] - a[1])[0][0]
    }
}

export class Statistics {
    ratioPerLanguage: Map<string, string>
    countPerMainLanguage: Map<string, number>

    constructor(ratioPerLanguage: Map<string, string>, countPerMainLanguage: Map<string, number>) {
        this.ratioPerLanguage = ratioPerLanguage;
        this.countPerMainLanguage = countPerMainLanguage;
    }
}
