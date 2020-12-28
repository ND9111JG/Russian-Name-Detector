require("dotenv").config();
let fs = require("fs");
let path = require("path");
let database = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./converted.json"), {encoding: 'utf-8'}).toString());
let database_test = database;

(async ()=>{
    await test();
    await test(process.env.GOOGLE_TRANSLATE_APIKEY);
})();

async function test(google_api_key){
    let detectGender = require("../index.js")({ google_api_key });

    let data_mismatch = [];
    let data_undefined = [];
    let data_ok = [];
    let dataset_counter = 0;

    let time_start = (new Date()).getTime();
    for(let test of database_test){
        dataset_counter++;
        let result = await detectGender(test.fullname);
        let test_result = test.gender;
        if(test_result === "1") test_result = "m";
        if(test_result === "2") test_result = "f";
        if(test_result === "0") test_result = undefined;
        if(!result.sex){
            test.detectGender_sex = result.sex;
            data_undefined.push(test);
            continue;
        }
        if(result.sex != test_result && test.gender !== "0"){
            test.detectGender_sex = result.sex;
            data_mismatch.push(test);
            continue;
        }
        data_ok.push(test);
    }

    let time_end = (new Date()).getTime();
    
    console.log("---------------------------");
    console.log("data_undefined:", data_undefined.length);
    console.log("data_ok:", data_ok.length);
    console.log("good:", ((data_ok.length/database_test.length)*100).toFixed(2), '%');
    console.log("Time:", time_end-time_start,'ms', `(${(database_test.length/((time_end-time_start)/1000)).toFixed(0)} per sec.) ${google_api_key?'with google translate':'without google translate'}`)
}