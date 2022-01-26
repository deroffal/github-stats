import * as github from "./github"
import * as stats from "./stats"

const owner = "deroffal";

github.listLanguagesForUser(owner)
    .then(stats.aggregate)
    .then(console.info)



