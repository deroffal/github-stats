import 'dotenv/config'
import {statsForUser} from "./main"

const owner = process.env.REPOSITORY_OWNER
if (owner === undefined) {
    throw new Error("Please provide a REPOSITORY_OWNER value.")
}

statsForUser(owner)
