import Database from "../db"
import path from "path"

new Database(path.join(__dirname, './testdb'))
.createCollection('users', {
    name: 'string',
    age: 'number'
})
.insert('users', { name: 'user', age: 15 })
.findInsert('users', { name: 'user' }, { name: 'another_user', age: 18 })