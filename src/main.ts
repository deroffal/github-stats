import * as github from "./github"
import * as stats from "./stats"

import {repositoryOwner} from "./config";
import {Statistics} from "./models";

main(repositoryOwner)
    .then(console.info)

async function main(username: string): Promise<Statistics> {
    let userExists = await github.existsByUsername(username)
    if (userExists) {
        let languagesForUser = await github.listLanguagesForUser(username);
        return stats.aggregate(languagesForUser);
    } else {
        throw new Error("Unknown user : " + username)
    }
}
