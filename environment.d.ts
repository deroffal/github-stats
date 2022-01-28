declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            REPOSITORY_OWNER: string;
        }
    }
}

export {}
