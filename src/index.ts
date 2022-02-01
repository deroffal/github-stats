import {repositoryOwner} from "./config";
import {statsForUser} from "./main";

if (repositoryOwner !== undefined) {
    statsForUser(repositoryOwner)
}
