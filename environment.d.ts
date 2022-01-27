declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REPOSITORY_OWNER: string;
        }
    }
}

export {}
