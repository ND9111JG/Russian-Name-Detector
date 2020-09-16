let genderByName = require("./sexDefiner").byName;

function wordEndsBy(word, a){
    let match = false;
    for(let _a of a) {
        if(word.endsWith(_a)) match = true;
    }
    return match;
}

function titleCase(str){
    if(!str) return str;
    return str.split(" ").map(x=>x.charAt(0).toUpperCase() + x.toLowerCase().substring(1)).join(" ");
}

module.exports = function(options={}){
    let gt;
    if(options.google_api_key) gt = require("./GoogleTranslate")(options.google_api_key);
    
    return async function(t) {
        let name, middlename, surname, sex, filter;
        let res = [];
        let RULES = ['саша', 'женя', 'валя', 'слава', 'вася', 'азазель'];
        
        t = t.match(/([a-zA-Zа-яА-ЯёЁ])+/g);
    
        let only_russian = (t.map(x => x.match(/([a-zA-Z])/))).includes(null);    
        if (only_russian) {
            filter = t;
        }else{
            if(options.google_api_key){
                let translated = await gt.translate(titleCase(t.join(" ")));
                filter = t;
                if(translated) filter = translated.split(" ");
            }else{
                filter = t;
            }
        }
    
        for (let elem_i in filter) res.push({...genderByName(filter[elem_i]), index: elem_i});
    
        for(let elem of res){
            if(elem.sex !== false) {
                name = t[elem.index];
                sex = elem.sex;
            }
            if(RULES.find(x=>x.name == elem.name)) name = RULES[RULES.indexOf(elem.index)];
        }
    
    
        if (name) filter.splice(filter.indexOf(name), 1); 
    
        for (let elem of filter) {
            if ( wordEndsBy(elem, ['вич', 'льич'])  ) 
                {middlename = elem; !sex? sex = 'm': false}
            if (wordEndsBy(elem, ['вна', 'чна']) ) 
                {middlename = elem; !sex? sex = 'f': false}
        }
    
        if (middlename) filter.splice(filter.indexOf(middlename), 1); 
    
        for (let elem_i in filter) {
            let elem = filter[elem_i];
            if ( wordEndsBy(elem, ['ов','ин','ын', 'ев','ий','ой']) ) 
                {surname = t[elem_i]; !sex? sex = 'm': false}
            if ( wordEndsBy(elem, ['ова', 'ина', 'ына', 'ева', 'ая']) ) 
                {surname = t[elem_i]; !sex? sex = 'f': false} 
            if ( wordEndsBy(elem, ['ых', 'их', 'вили', 'ло', 'ко', 'юк', 'но', 'ян', 'дзе', 'ели', 'ети', 'ани', 'идис', 'кин', 'ич', 'дзи', 'ман', 'берг', 'ейко', 'аль', 'ель', 'ейн', 'бец']) ) 
                {surname = t[elem_i];}
        }
    
        if (surname) filter.splice(filter.indexOf(surname), 1);
    
        if (filter.length > 0 && filter.length < 2) {
            if (!name) {
                name = filter[0]; 
                filter.splice(filter.indexOf(name), 1);
            }
            if (!surname) {
                surname = filter[0]; 
                filter.splice(filter.indexOf(surname), 1); 
            }
        }
    
        return {
            name: titleCase(name), 
            middlename: titleCase(middlename), 
            surname: titleCase(surname), 
            sex
        };
    }
};