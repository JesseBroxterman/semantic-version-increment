const core = require('@actions/core')
const github = require('@actions/github')

const Increment_Type = {
    Minor: 'minor',
    Patch: 'patch' 
}

const Labels_In_Use = {
    Bug: 'bug',
    Enhancement: 'enhancement',
    Chore: 'chore',
    Subtask: 'subtask'
}

try {
    const current_Version = core.getInput('current_version');
    const pr_labels_stringified = core.getInput('pr_labels');
    const pr_labels = pr_labels_stringified.split(',');

    console.log("current version = " + current_Version);
    console.log("labels = " + pr_labels);

    //take the current version and separate it into it's components: Major, Minor, & Patch
    let [major, minor, patch] = current_Version.split(".");

    if (pr_labels.includes(Labels_In_Use.Enhancement) || pr_labels == Labels_In_Use.Enhancement) {
        minor = parseInt(minor) + 1;
        patch = 0;
        console.log("Matched enhancement.");
    } else if (pr_labels.includes(Labels_In_Use.Bug) || pr_labels == Labels_In_Use.Bug || pr_labels.includes(Labels_In_Use.Chore) || pr_labels == Labels_In_Use.Chore) {
        patch = parseInt(patch) + 1;
        console.log("Matched bug or chore.");
    } else if (pr_labels.includes(Labels_In_Use.Subtask) || pr_labels ==Labels_In_Use.Subtask) {
        //do nothing
    } else {
        throw new Error('There is no label on the pull request.');
    }

    let new_version = major.concat('.', minor, '.', patch);
    console.log("new version = " + new_version);
    core.setOutput("new_version", new_version)

} catch (error) {
    core.setFailed(error.message);
}
