#!/usr/bin/env node

var papa = require("papaparse");
var fs = require("fs");
const path = require("path");

var args = process.argv.slice(2);
let filePath;
if (args[0]) {
  filePath = args[0];
} else {
  throw new Error("Missing input file");
}

const file = fs.createReadStream(filePath);
papa.parse(file, {
  complete: function (results) {
    var files = {};
    results.data.forEach((item) => {
      var key = item.key;
      Object.keys(item).forEach((lang) => {
        if (lang != "key") {
          if (!files[lang]) files[lang] = {};
          files[lang][key] = item[lang];
        }
      })
    });
    const currentDir = process.cwd();
    Object.keys(files).forEach((lang) => {
      var filePath = path.join(currentDir, lang + ".json");
      if (args[1]) {
        if (!fs.existsSync(args[1])) {
          fs.mkdirSync(args[1]);
        }
        filePath = path.join(args[1], lang + ".json");
      }
      var data = JSON.stringify(files[lang], undefined, 2);
      fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log(filePath);
      });
    })

  },
  error: function (err) {
    throw new Error(err)
  },
  header: true,
  transformHeader: (header, index) => {
    if (index == 0) {
      return "key";
    } else {
      return header;
    }
  }
});
