import * as github from "./github"
import * as stats from "./stats"

export async function statsForUser(username: string) {
    let userExists = await github.existsByUsername(username)
    if (userExists) {
        let languagesForUser = await github.listLanguagesForUser(username);
        let statsForUser = stats.aggregate(languagesForUser);
        console.info(statsForUser)
    } else {
        throw new Error("Unknown user : " + username)
    }
}
