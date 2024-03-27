const core = require('@actions/core')
const github = require('@actions/github')

const Increment_Type = {
    Minor: 'minor',
    Patch: 'patch' 
}

const Issue_Types = {
    Bug: 'Bug',
    Subtask: 'Sub-task',
    Story: 'Story',
    Task: 'Task',
    Change: 'Change',
    Incident: 'Incident',
    Problem: 'Problem',
    Service_Request: 'Service Request',
    Service_Request_Approvals: 'Service Request With_Approvals'
}

try {
    const current_Version = core.getInput('current_version');
    const issue_type = core.getInput('issue_type');


    console.log("current version = " + current_Version);
    console.log("issue type = " + issue_type);

    //take the current version and separate it into it's components: Major, Minor, & Patch
    let [major, minor, patch] = current_Version.split(".");

    if (issue_type == Issue_Types.Story || issue_type == Issue_Types.Service_Request || issue_type == Issue_Types.Service_Request_With_Approvals || issue_type == Issue_Types.Change) {
        minor = parseInt(minor) + 1;
        patch = 0;
        console.log("Matched story, incremented minor value.");
    } else if (issue_type == Issue_Types.Bug || issue_type == Issue_Types.Task || issue_type == Issue_Types.Incident || issue_type == Issue_Types.Problem) {
        patch = parseInt(patch) + 1;
        console.log("Incremented patch value.");
    } else if (issue_type == Issue_Types.Subtask) {
        //do nothing
    } else {
        throw new Error('No issue match.');
    }

    let new_version = major.concat('.', minor, '.', patch);
    console.log("new version = " + new_version);
    core.setOutput("new_version", new_version)

} catch (error) {
    core.setFailed(error.message);
}
