const core = require('@actions/core')
const github = require('@actions/github')

const Increment_Type = {
    Minor: 'minor',
    Patch: 'patch' 
}

const Issue_Types = {
    Bug: 'Bug',
    Subtask: 'Subtask',
    Story: 'Story',
    Task: 'Task'
}

try {
    const current_Version = core.getInput('current_version');
    const issue_type = core.getInput('issue_type');


    console.log("current version = " + current_Version);
    console.log("issue type = " + issue_type);

    //take the current version and separate it into it's components: Major, Minor, & Patch
    let [major, minor, patch] = current_Version.split(".");

    if (issue_type == Issue_Types.Story) {
        minor = parseInt(minor) + 1;
        patch = 0;
        console.log("Matched story, incremented minor value.");
    } else if (issue_type == Issue_Types.Bug || issue_type == Issue_Types.Subtask || issue_type == Issue_Types.Task) {
        patch = parseInt(patch) + 1;
        console.log("Incremented patch value.");
    } else {
        throw new Error('No issue match.');
    }

    let new_version = major.concat('.', minor, '.', patch);
    console.log("new version = " + new_version);
    core.setOutput("new_version", new_version)

} catch (error) {
    core.setFailed(error.message);
}
