var refToLinkConverter = function(ref) {
    return ref.split('/').join('_').split(' ').join('_').toLowerCase();
};

var removePrefixAndSuffixFromName = function (name) {
    var parts = name.match(/(\d+_)?([^\.]*)(\.md)?/);
    if (parts && parts.length > 0) {
        return parts[2];
    } else {
        return name;
    }
};

var convertPathToLink = function(path) {
    return '/'+path.split('/').map(function(part) {
        return removePrefixAndSuffixFromName(part);
    }).filter(function(part) {
        return part.length>0 && !part.match(/d+_/);
    }).join('/');
};

module.exports.refToLinkConverter= refToLinkConverter;
module.exports.removePrefixAndSuffixFromName = removePrefixAndSuffixFromName;
module.exports.convertPathToLink = convertPathToLink;