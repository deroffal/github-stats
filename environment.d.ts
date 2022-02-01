declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_TOKEN: string;
            NODE_ENV: string;
            REPOSITORY_OWNER: string;
        }
    }
}

export {}
