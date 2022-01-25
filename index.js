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


listReposForUser("deroffal")
    .then(({data}) => {
        console.log(data);
        let languagePromises = data.map(repoData => listLanguages("deroffal", repoData.name));
        return Promise.all(languagePromises);
    }).then((languages) => {
    let lang = languages.map(language => language.data);
    console.log(lang);
});


