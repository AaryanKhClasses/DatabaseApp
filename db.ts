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
     * @param {string} collectionName The name of the collection to be created
     * @param {Object} schema The schema of the collection
    */
    createCollection(collectionName: string, schema: Object) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({"schema": schema}))
        return this
    }

    /**
     * @param {string} collectionName The name of the collection in which to find and delete the data
     * @warning This will the collection permanently
    */
    deleteCollection(collectionName: string) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        fs.unlinkSync(filePath)
        return this
    }

    /**
     * @param {string} collectionName The name of the collection in which to insert the data
     * @param {Object} data The data to insert
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
     * @param {string} collectionName The name of the collection in which to find and insert the data
     * @param {Object} filter The filter to find the data
     * @param {Object} data The data to insert
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
     * @param {string} collectionName The name of the collection in which to find the data
     * @param {Object} filter The filter to find the data
     * @returns true if found filter object in collection, else false
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
        }
        return true
    }

    /**
     * @param {string} collectionName The name of the collection in which to get the data
     * @param {Object} filter The filter to get the data
     * @returns The data found
    */
    get(collectionName: string, filter: Object) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if(!json.data) json.data = []
        for(const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata: any) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key])
            if(!found) throw new Error('No data found for the given filter')
            return found
        }
    }

    /**
     * @param {string} collectionName The name of the collection in which to find and update the data
     * @param {Object} filter The filter to find the data
     * @param {Object} data The data to update
     * @param {boolean} upsert If true, only change the data provided, else replace the data with the data provided
    */
    findUpdate(collectionName: string, filter: Object, data: Object, upsert: boolean = false) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if(!json.data) json.data = []
        for(const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata: any) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key])
            if(!found) throw new Error('No data found for the given filter')
            for(const key in data) {
                // @ts-ignore
                if(json.schema[key] !== typeof data[key]) throw new Error(`Key ${key} is of type ${json.schema[key]} and not ${typeof data[key]}`)
            }
            if(upsert === false) json.data.splice(json.data.indexOf(found), 1, data)
            else if(upsert === true) {
                for(const key in data) {
                    // @ts-ignore
                    found[key] = data[key]
                }
            }
        }
        fs.writeFileSync(filePath, JSON.stringify(json))
        return this
    }

    /**
     * @param {string} collectionName The name of the collection in which to find and delete the data
     * @param {Object} filter The filter to find the data
     * @warning This deletes the data specified permanently
    */
    findDelete(collectionName: string, filter: Object) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if(!json.data) json.data = []
        for(const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata: any) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key])
            if(!found) throw new Error('No data found for the given filter')
            json.data.splice(json.data.indexOf(found), 1)
        }
        fs.writeFileSync(filePath, JSON.stringify(json))
        return this
    }

    /**
     * @param collectionName The name of the collection in which to find and clear the data
     * @warning This clears all the "data" in the collection
    */
    clear(collectionName: string) {
        const filePath = `${this.#pathToFolder}/${collectionName}.json`
        if(!fs.existsSync(filePath)) throw new Error('Collection does not exist')
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        json.data = []
        fs.writeFileSync(filePath, JSON.stringify(json))
        return this
    }
}