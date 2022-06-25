import fs from 'fs'

export default class Database {
    #pathToFolder: string
    /**
     * @param {string} pathToFolder Path to folder where the database is stored
    */
    constructor(pathToFolder: string) {
        this.#pathToFolder = pathToFolder
        if(!fs.existsSync(this.#pathToFolder)) fs.mkdirSync(this.#pathToFolder)
    }

    /**
     * @param collectionName The name of the collection to be created
     * @param schema The schema of the collection
    */
    createCollection(collectionName: string, schema: Object) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({"schema": schema}))
        return this
    }

    /**
     * @param collectionName The name of the collection in which to insert the data
     * @param data The data to insert
    */
    insert(collectionName: string, data: Object) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if(!json.data) json.data = []
        for(const key in data) {
            if(!json.schema[key]) throw new Error(`Key ${key} is not in schema`)
            // @ts-ignore
            if(json.schema[key] !== typeof data[key]) throw new Error(`Key ${key} is of type ${json.schema[key]} and not ${typeof data[key]}`)
        }
        json.data.push(data)
        fs.writeFileSync(filePath, JSON.stringify(json))
        return this
    }

    /**
     * @param collectionName The name of the collection in which to find and insert the data
     * @param filter The filter to find the data
     * @param data The data to insert
    */
    findInsert(collectionName: string, filter: Object, data: Object) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if(!json.data) json.data = []
        for(const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata: any) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key])
            // @ts-ignore
            if(!found) throw new Error(`No data found with ${key} = ${filter[key]}`)
        }
        for(const key in data) {
            if(!json.schema[key]) throw new Error(`Key ${key} is not in schema`)
            // @ts-ignore
            if(json.schema[key] !== typeof data[key]) throw new Error(`Key ${key} is of type ${json.schema[key]} and not ${typeof data[key]}`)
        }
        json.data.push(data)
        fs.writeFileSync(filePath, JSON.stringify(json))
        return this
    }

    /**
     * @param collectionName The name of the collection in which to find the data
     * @param filter The filter to find the data
     * @note This function is not yet implemented. Please do not use this function as this won't do anything.
    */
    find(collectionName: string, filter: Object) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if(!json.data) json.data = []
        for(const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata: any) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key])
            if(!found) return false
            return true
        }
        return this
    }
}