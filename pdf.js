require('./src/index').generate({
    docGitPath: 'doc',
    source: process.cwd()+'/doc',
    pdf: true,
    targetHtml: process.cwd()+"/dist/pdf.html"
})

