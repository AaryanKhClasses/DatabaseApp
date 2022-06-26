import Database from "../db"
import path from "path"

const db = new Database(path.join(__dirname, './testdb'))
.createCollection('users', {
    name: 'string',
    age: 'number'
})
// .insert('users', { name: 'user', age: 15 })
// .findInsert('users', { name: 'user' }, { name: 'another_user', age: 18 })

if(db.find('users', { name: 'user' })) console.log('found user!')

const user = db.get('users', { name: 'user' })
console.log(user.age)

db.findUpdate('users', { name: 'another_user' }, { age: 20 }, true)

// db.insert('users', { name: 'deletetable_user', age: 13 })
db.findDelete('users', { name: 'deletetable_user' })