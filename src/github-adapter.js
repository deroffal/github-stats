const {Octokit} = require("@octokit/rest");

const octokit = new Octokit();

//list all repos for the user
const listReposForUser = username =>
    octokit.rest.repos.listForUser({
        username: username
    });

//list all languages of a repo
const listLanguages = (owner, repoName) =>
    octokit.rest.repos.listLanguages({
        owner: owner,
        repo: repoName
    });


const listLanguagesForUser = username =>
    listReposForUser(username)
        .then(({data}) => {
            let languagePromises = data.map(repoData => listLanguages(username, repoData.name));
            return Promise.all(languagePromises);
        })

exports.listLanguagesForUser = listLanguagesForUser;
