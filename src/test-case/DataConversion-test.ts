import { DataConversion } from "../DataConversion";

const text = `
Language
  JavaScript
    TypeScript
    NodeJS
  HTML
Server
  DataBase
    MongoDB
System
  Linux
  Window
`;

const textJSON = DataConversion(text);
console.log(JSON.stringify(textJSON));
