const fs = require('fs');
const sloc = require('sloc');

let fileList = [];
function files(dir) {
    for (let file of fs.readdirSync(dir)) {
        if (fs.lstatSync(dir + "/" + file).isDirectory()) {
            files(dir + "/" + file);
        } else {
            fileList.push(dir + "/" + file);
        }
    }
}

files(__dirname);
list = fileList.filter((i) => {
    return i.endsWith(".ts") && !i.includes("/node_modules/");
})

lines = {
    total: 0,
    comment: 0,
    empty: 0,
    todo: 0,
    source: 0
}

for (let file of list) {
    let data = fs.readFileSync(file).toString();
    let stats = sloc(data, "ts");

    lines.total += stats["total"];
    lines.comment += stats["comment"];
    lines.empty += stats["empty"];
    lines.todo += stats["todo"];
    lines.source += stats["source"];
}

console.log("Source Code Lines:  " + lines.source);
console.log("Comment Lines:      " + lines.comment);
console.log("Empty Lines:        " + lines.empty);
console.log("Todo Lines:         " + lines.todo);
console.log("-------------------------------")
console.log("Total:              " + lines.total);