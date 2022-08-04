import * as github from "./client/github"
import * as stats from "./service/stats"
import {getRepositoryOwner} from "./config/config"


(async () => {
    console.info("start ...")
    let username = getRepositoryOwner()
    console.info(`username : ${username}`)
    let userExists = await github.existsByUsername(username)
    if (userExists) {
        console.info("fetching data ...")
        let languagesForUser = await github.listLanguagesForUser(username)
        let statistics = stats.aggregate(languagesForUser)
        console.log(JSON.stringify(statistics));
    } else {
        throw new Error("Unknown user : " + username)
    }
})()
