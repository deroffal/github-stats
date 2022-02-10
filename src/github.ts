import {Octokit, RestEndpointMethodTypes} from "@octokit/rest";
import {githubToken} from "./config";
import {LanguageCount, LanguagesForRepository, Repository} from "./repositories.models";

type ReposForUserRest = RestEndpointMethodTypes["repos"]["listForUser"]["response"]

const octokit = new Octokit({
    auth: githubToken
});

function listReposForUser(username: string) {
    return octokit.rest.repos.listForUser({
        username: username
    });
}

const listLanguages = (repository: Repository) =>
    octokit.rest.repos.listLanguages({
        owner: repository.owner,
        repo: repository.name
    }).then(({data}) => {
        let languages = Object.entries(data).map(countPerLanguage => new LanguageCount(countPerLanguage[0], countPerLanguage[1]))
        return new LanguagesForRepository(repository, languages);
    });


function getLanguagesForRepositories(data: ReposForUserRest["data"], username: string) {
    let languagePromises = data
        .map(repo => new Repository(username, repo.name))
        .map(repository => listLanguages(repository));
    return Promise.all(languagePromises);
}

function excludeForks(repositories: ReposForUserRest): ReposForUserRest["data"] {
    return repositories.data.filter(repository => !repository.fork);
}

export async function listLanguagesForUser(username: string): Promise<Awaited<LanguagesForRepository>[]> {
    return listReposForUser(username)
        .then(excludeForks)
        .then((data) => getLanguagesForRepositories(data, username));
}

export async function existsByUsername(username: string) {
    return octokit.rest.users.getByUsername({
        username: username
    }).then(() => {
            return true;
        },
        () => {
            return false;
        }
    )
}
