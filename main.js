const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

const repository = core.getInput('repository');
var owner = core.getInput('owner');
var repo = core.getInput('repo');
var token = core.getInput('token');

const octokit = new Octokit({
    auth: token,
})

async function run() {
    try {
        if (repository){
                [owner, repo] = repository.split("/");
            }
        const releases  = await octokit.repos.listReleases({
            owner: owner,
            repo: repo,
            });
        core.setOutput('release', releases.data[0].tag_name)
        }
    catch (error) {
        core.setFailed(error.message);
        }
    }

run()
