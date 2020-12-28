let zipped = require("./namedb");
zipped += ["гиви1","энрико1","вилен1","навид1","рафаель1","евкакий1","акакий1","евпатий1","владена0","стеша0","иоанн1"].join("")

let names = zipped.match(/[а-яА-ЯA-Za-z]+/g);
let sex = zipped.match(/\d/g);

module.exports.byName = function(name){
    name = name.toLowerCase().replace(/ё/g, 'е');
    let found_index = names.indexOf(name);
    if(found_index == -1) return {name, sex: false}
    return {name: names[found_index], sex: sex[found_index]==1?'m':'f'};
}