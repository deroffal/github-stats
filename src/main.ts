import * as github from "./github"
import * as stats from "./stats"

import {repositoryOwner} from "./config";
import {Statistics} from "./statistics.models";

main(repositoryOwner)
    .then((s: Statistics) => {
        let json = JSON.stringify(s);
        console.log(json);
    })

async function main(username: string): Promise<Statistics> {
    let userExists = await github.existsByUsername(username)
    if (userExists) {
        let languagesForUser = await github.listLanguagesForUser(username);
        return stats.aggregate(languagesForUser);
    } else {
        throw new Error("Unknown user : " + username)
    }
}
