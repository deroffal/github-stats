import {statsForUser} from "./main";

let env = process.env.NODE_ENV;
if (env === undefined) {
    throw new Error("Please provide a NODE_ENV value.")
}

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const owner = process.env.REPOSITORY_OWNER
if (owner === undefined) {
    throw new Error("Please provide a REPOSITORY_OWNER value.")
}

statsForUser(owner)
