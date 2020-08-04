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
        core.setOutput('release', getNextVersion(releases.data[0].tag_name))
        }
    catch (error) {
        core.setFailed(error.message);
        }
    }

run()


function getNextVersion(currentVersion) {
    var d = new Date();

    var version = '';
    version += 'v' + d.getFullYear().toString().substr(-2);
    version += '.' + ('0' + (d.getMonth() + 1)).substr(-2);
    version += '.' + ('0' + (d.getDate())).substr(-2);

    var i = currentVersion.lastIndexOf('.');
    var currentVersionDate = currentVersion.substr(0, i);
    var currentVersionVersion = parseInt(currentVersion.substr(i + 1));

    if (version === currentVersionDate) {
        return version + '.' + (currentVersionVersion + 1);
    } else {
        return version + '.1';
    }
}
