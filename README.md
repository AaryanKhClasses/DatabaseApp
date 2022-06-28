# DatabaseApp
### A Simple, Local JSON-Based Database Application.

---

## Contents
- ### [Installation](#Installation)
- ### [Getting Started](#Getting-Started)
- ### [Creating a Collection](#Creating-a-Collection)
- ### [Inserting Data into Collection](#Inserting-Data-into-Collection)
- ### [Finding Data in a Collection](#Finding-Data-in-a-Collection)
- ### [Fetching / Getting Data from a Collection](#Fetching-/-Getting-Data-from-a-Collection)
- ### [Find & Insert Data in a Collection](#Find-&-Insert-Data-in-a-Collection)
- ### [Find & Update Data in a Collection](#Find-&-Update-Data-in-a-Collection)
- ### [Find & Delete Data in a Collection](#Find-&-Delete-Data-in-a-Collection)
- ### [Deleting a Collection](#Deleting-a-Collection)
- ### [Clearing Data in a Collection](#Clearing-Data-in-a-Collection)
- ### [Future Features Plans](#Future-Features-Plans)
- ### [Credits](#Credits)

---

## Installation
### To install the package and create a database, run:
```sh
$npm install @aaryankh/dbapp
```
### After installing, import the package into your project:
```ts
import Database from '@aaryankh/dbapp'
```

---

## Getting started
### The package provides many useful functions to work with local JSON-based databases.
### To get started, create a new instance of the database app:
```ts
import Database from '@aaryankh/dbapp'
import path from 'path'

const db = new Database(path.join(__dirname, 'path-to-db-folder'))
```
### You would need to specify the path to the folder where the database will be stored. (NOTE: It must be a folder 'path')

---

## Creating a Collection
### To create a new collection in the database, use the `createCollection` method:
```ts
db.createCollection('users', {
    name: 'string',
    age: 'number'
})
```
### You must specify the name of the collection and the schema of the collection.

---

## Inserting Data into Collection
### To insert data into a collection, use the `insert` method:
```ts
db.insert('users', { name: 'John', age: 30 })
```
### You must specify the name of the collection and the data to insert.

---

## Finding Data in a Collection
### To find data in a collection, use the `find` method:
```ts
db.find('users', { name: 'John' })
```
### You must specify the name of the collection and the query to find the data.
### This would return `true` if found and `false` if not found.

---

## Fetching / Getting Data from a Collection
### To get data from a collection, use the `get` method:
```ts
db.get('users', { name: 'John' })
```
### You must specify the name of the collection and the query to get the data.
### This would return the data `array` if found.

---

## Find & Insert Data in a Collection
### To find and insert data in a collection, use the `findInsert` method:
```ts
db.findInsert('users', { name: 'John' }, { name: 'Mike', age: 30 })
```
### You must specify the name of the collection, the query to find the data, and the data to insert.

---

## Find & Update Data in a Collection
### To find and update data in a collection, use the `findUpdate` method:
```ts
db.findUpdate('users', { name: 'John' }, { name: 'Mike', age: 30 })
```
### You must specify the name of the collection, the query to find the data, and the data to update.
### You also have the option to `upsert` (only modify the specified fields) to update.
```ts
db.findUpdate('users', { name: 'John' }, { age: 30 }, true)
// This will only update the age field.
```

---

## Find & Delete Data in a Collection
### To find and delete data in a collection, use the `findDelete` method:
```ts
db.findDelete('users', { name: 'John' })
```
### You must specify the name of the collection and the query to find the data.
### Warning, this will delete all data that matches the query.

---

## Deleting a Collection
### To delete a collection, use the `deleteCollection` method:
```ts
db.deleteCollection('users')
```
### You must specify the name of the collection to delete.
### Warning, this will delete the whole collection.

---

## Clearing Data in a Collection
### To clear data in a collection, use the `clear` method:
```ts
db.clear('users')
```
### You must specify the name of the collection to clear.
### Warning, this will delete all data in the collection.

---

## Future Features Plans
### 1. Counting Data in a Collection
### 2. GUI for Database App
### 3. More advanced queries
### and much more...

---

## Credits
### Project Owner: [AaryanKhClasses](https://github.com/AaryanKhClasses)
### Also Check My other Project: [Sayout Clone](https://github.com/AaryanKhClasses/Sayout-Clone)

---