export class Repository {
    owner: string
    name: string

    constructor(owner: string, name: string) {
        this.owner = owner;
        this.name = name;
    }
}

export class LanguageForRepository {
    repository: Repository
    languages: Map<string, number>

    constructor(repository: Repository, languages: Map<string, number>) {
        this.repository = repository;
        this.languages = languages;
    }
}
