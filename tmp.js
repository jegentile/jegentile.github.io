var gist = {"history": [
    {"version": "4bccc9723bc6420cbae15908964e76714a715640"}
], "files": {"README.md": {"language": "Markdown", "type": "text/plain", "filename": "README.md", "size": 1071, "sha": "4ccd9dd3bfd1a17af559ac15f067c6c52c965a28"}, "data.csv": {"language": null, "type": "text/csv", "filename": "data.csv", "size": 2804, "sha": "178cdc4c900967b134175369147682a55ad3cebe"}, "index.html": {"language": "HTML", "type": "text/html", "filename": "index.html", "size": 3878, "sha": "b13528699162ae1ff9f9e5afc9404fc5551589b7"}, "thumbnail.png": {"language": null, "type": "image/png", "filename": "thumbnail.png", "size": 11602, "sha": "ed399cb807cae14f3dcb60eefbb8534475c9d344"}}, "created_at": "2013-06-26T23:54:45.000Z", "updated_at": "2014-06-20T05:53:41.000Z", "description": "Dispatching Events", "owner": {"login": "mbostock"}, "id": "5872848"};

var files = d3.values(gist.files)
    .sort(function (a, b) {
        return (b.filename === "index.html") - (a.filename === "index.html") || a.filename.localeCompare(b.filename);
    });

var readme = d3.selectAll(".gist-readme")
    .data(files.filter(function (d) {
        return /^readme\b/i.test(d.filename) && d.language === "Markdown";
    }))
    .each(function (d) {
        var readme = d3.select(this);
        d3.text("/mbostock/raw/5872848/4bccc9723bc6420cbae15908964e76714a715640/" + d.filename, function (error, content) {
            readme.html(new Showdown.converter().makeHtml(content));
            readme.selectAll("code").each(function () {
                hljs.highlightBlock(this);
            });
        });
    });

var source = d3.select(".gist-sources").selectAll(".gist-source")
    .data(files.filter(function (d) {
        return !/^readme\b/i.test(d.filename) && d.size < 50000 && text(d.type);
    }))
    .enter().append("div")
    .attr("class", "gist-source");

source.append("h2")
    .text(function (d) {
        return d.filename;
    })
    .append("a")
    .attr("name", function (d) {
        return d.filename;
    })
    .attr("href", function (d) {
        return "#" + d.filename;
    })
    .text("#");

source.append("pre").append("code")
    .attr("class", function (d) {
        return d.language && (d.language === "JSON" ? "javascript" : d.language.toLowerCase());
    })
    .each(function (d) {
        var code = d3.select(this);
        d3.text("/mbostock/raw/5872848/4bccc9723bc6420cbae15908964e76714a715640/" + (d.filename === "index.html" ? "" : d.filename), function (error, content) {
            code.text(content);
            hljs.highlightBlock(code.node());
        });
    });

function text(type) {
    return /(^text\/)|(^application\/(javascript|json)$)|(^image\/svg$)|(\+xml$)/.test(type);
}

/**
 * Created by jgentile on 8/27/14.
 */
