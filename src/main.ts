import * as github from "./github"
import * as stats from "./stats"
import 'dotenv/config'


const owner = process.env.REPOSITORY_OWNER
if(owner === undefined){
    throw new Error("Please provide a REPOSITORY_OWNER value.")
}
console.debug("owner : " + owner)

github.listLanguagesForUser(owner)
    .then(stats.aggregate)
    .then(console.info)



