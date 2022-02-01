import {Octokit, RestEndpointMethodTypes} from "@octokit/rest";
import {LanguagesForRepository, Repository} from "./models";
import {githubToken} from "./config";

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
        return new LanguagesForRepository(repository, new Map(Object.entries(data)));
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
