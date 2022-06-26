"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const path_1 = __importDefault(require("path"));
const db = new db_1.default(path_1.default.join(__dirname, './testdb'))
    .createCollection('users', {
    name: 'string',
    age: 'number'
});
// .insert('users', { name: 'user', age: 15 })
// .findInsert('users', { name: 'user' }, { name: 'another_user', age: 18 })
if (db.find('users', { name: 'user' }))
    console.log('found user!');
const user = db.get('users', { name: 'user' });
console.log(user.age);
db.findUpdate('users', { name: 'another_user' }, { age: 20 }, true);
// db.insert('users', { name: 'deletetable_user', age: 13 })
db.findDelete('users', { name: 'deletetable_user' });
