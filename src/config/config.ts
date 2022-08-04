export function getRepositoryOwner(): string {
    return process.env.REPOSITORY_OWNER || (() => {
        throw new Error("env REPOSITORY_OWNER missing")
    })()
}

export function getGithubToken(): string {
    return process.env.GITHUB_TOKEN || (() => {
        throw new Error("env GITHUB_TOKEN missing")
    })()
}
