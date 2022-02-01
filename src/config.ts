const env = process.env.NODE_ENV;
if (env === undefined) {
    throw new Error("Please provide a NODE_ENV value.")
}

console.info(`starting in ${env} mode`)
if (env !== 'production') {
    console.info(`loading .env file`)
    require('dotenv').config()
}

export const repositoryOwner = process.env.REPOSITORY_OWNER
if (repositoryOwner === undefined) {
    throw new Error("Please provide a REPOSITORY_OWNER value.")
}

export const githubToken = process.env.GITHUB_TOKEN
if (githubToken === undefined) {
    throw new Error("Please provide a GITHUB_TOKEN value.")
}
