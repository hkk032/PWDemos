import {test} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

// 1. Using Array
// list of items to run the test over
const searchItems:string[] = ['apple', 'banana', 'orange', 'grape', 'watermelon'];
// iterating over the list of items
for (const item of searchItems) {
    // running test for each list item
    // in test name we are passing the item, because the run will fail as it will have the same test name every time
    test (`Search for ${item}`, async () => {

    });
}


// 2. Using Object/Map
// Login Parameterization
const loginDataObject:string[][] = [
    ["abc@gmail.com", "pass1", "valid"], 
    ["invaliduser@gmail.com", "pass1", "invalid"], 
    ["user@gmail.com", "invalidpass", "invalid"],
    ["", "", "invalid"]];
// TO store all 3 values of single dataset inside loop
for (const [email, password, type] of loginDataObject) {}


// 3. JSON
// for this import fs from 'fs'
// Reading json data
const jsonPath = "test-data/testData.json";
// Parsing json file
const loginDataJSON:any = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
for (const {email, password, type} of loginDataJSON) {}


// 4. CSV
// Pre-requisite - for CSV need to install a third party library csv-parse
// npm install csv-parse
// Import
// import fs from 'fs';
// import {parse} from 'csv-parse/sync';
// Reading csv data
const csvPath = "test-data/testData.csv";
const loginDataCSV = fs.readFileSync(csvPath, "utf-8");     // loginDataCSV stores all the file content
// Parsing File content to get values line by line - segrregating on columns and skipping empty lines
const records = parse(loginDataCSV, {columns:true, skip_empty_lines:true});
for (const data of records) {
    // data will have email, password and type as keys and their respective values for each line in csv file
    const email = data.email;
    const password = data.password;
    const type = data.type;
}


// 5. Excel (will parse excel to JSON)
// Pre-requisite - for Excel need to install a third party library xlsx
// npm install xlsx
// In excel file - if empty value needs to be given, don't give empty cells as it won't read it
// Can give 1 single quote in excel cell to make it read empty value as empty string
// Import
// import fs from 'fs';
// import * as XLSX from 'xlsx';
// Reading excel data
const excelPath = "test-data/testDataExcel.xlsx";
// Reading the complete excel file
const workbook = XLSX.readFile(excelPath);
// Reading sheet from workbook
const sheetName = workbook.SheetNames[0];   // reading first sheet
const worksheet =workbook.Sheets[sheetName];
// convert sheet to json
const loginDataExcel:any = XLSX.utils.sheet_to_json(worksheet);   // this will give the data in json format and we can iterate over it like we did for json file
for (const {email, password, type} of loginDataExcel) {
    
}