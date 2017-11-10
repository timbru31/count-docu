var getFilesInCommit = function (commitId, docGitPath) {
    var exec = require('child_process').execSync;
    var cmd = 'git diff-tree --name-only -r "' + commitId+ '"';
    var stdout = exec(cmd);

    var pattern = new RegExp(docGitPath + '.*\.md');
    var files = new String(stdout).split('\n').filter(function (filename) {
        return filename.match(pattern) != null;
    }).map(function (filename) {
        var ref = filename.substring(docGitPath.length);
        ref = require('./util').convertPathToLink(ref);
        return ref;
    })
    return files;

}

var getChangeLog = function (options, cb) {
    var exec = require('child_process').exec;
    var maxCommits = options.maxCommits || 5
    var cmd = 'git log -n ' + maxCommits + '  -- ' + options.source;

    exec(cmd, function (error, stdout, stderr) {
        var history = [];
        var commits = stdout.split('commit');
        commits.forEach(function (commit) {
            var result = commit.match(/(.*)(\nMerge: .*)?\nAuthor: (.*)<.*>\nDate: (.*)([\s\S]*)/);
            if (result != null) {
                var id = result[1].trim();
                var date = new Date(Date.parse(result[4]));
                var historyCommit = {
                    id: id,
                    author: result[3],
                    date: date,
                    message: result[5]
                }
                var files = getFilesInCommit(id, options.docGitPath);
                if (files.length > 0) {
                    historyCommit.files = files;
                    history.push(historyCommit);
                }
            }
        })
        cb(history);
    });
}

module.exports.getChangeLog = getChangeLog;
