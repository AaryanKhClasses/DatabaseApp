"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Database_pathToFolder;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Database {
    /**
     * @param {string} pathToFolder Path to folder where the database is stored
   */
    constructor(pathToFolder) {
        _Database_pathToFolder.set(this, void 0);
        __classPrivateFieldSet(this, _Database_pathToFolder, pathToFolder, "f");
        if (!fs_1.default.existsSync(__classPrivateFieldGet(this, _Database_pathToFolder, "f")))
            fs_1.default.mkdirSync(__classPrivateFieldGet(this, _Database_pathToFolder, "f"));
    }
    /**
     * @param {string} collectionName The name of the collection to be created
     * @param {Object} schema The schema of the collection
   */
    createCollection(collectionName, schema) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            fs_1.default.writeFileSync(filePath, JSON.stringify({ "schema": schema }));
        return this;
    }
    /**
     * @param {string} collectionName The name of the collection in which to find and delete the data
     * @warning This will the collection permanently
    */
    deleteCollection(collectionName) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        fs_1.default.unlinkSync(filePath);
        return this;
    }
    /**
     * @param {string} collectionName The name of the collection in which to insert the data
     * @param {Object} data The data to insert
   */
    insert(collectionName, data) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        const json = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        if (!json.data)
            json.data = [];
        for (const key in data) {
            if (!json.schema[key])
                throw new Error(`Key ${key} is not in schema`);
            // @ts-ignore
            if (json.schema[key] !== typeof data[key])
                throw new Error(`Key ${key} is of type ${json.schema[key]} and not ${typeof data[key]}`);
        }
        json.data.push(data);
        fs_1.default.writeFileSync(filePath, JSON.stringify(json));
        return this;
    }
    /**
     * @param {string} collectionName The name of the collection in which to find and insert the data
     * @param {Object} filter The filter to find the data
     * @param {Object} data The data to insert
   */
    findInsert(collectionName, filter, data) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        const json = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        if (!json.data)
            json.data = [];
        for (const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key]);
            // @ts-ignore
            if (!found)
                throw new Error(`No data found with ${key} = ${filter[key]}`);
        }
        for (const key in data) {
            if (!json.schema[key])
                throw new Error(`Key ${key} is not in schema`);
            // @ts-ignore
            if (json.schema[key] !== typeof data[key])
                throw new Error(`Key ${key} is of type ${json.schema[key]} and not ${typeof data[key]}`);
        }
        json.data.push(data);
        fs_1.default.writeFileSync(filePath, JSON.stringify(json));
        return this;
    }
    /**
     * @param {string} collectionName The name of the collection in which to find the data
     * @param {Object} filter The filter to find the data
     * @returns true if found filter object in collection, else false
   */
    find(collectionName, filter) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        const json = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        if (!json.data)
            json.data = [];
        for (const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key]);
            if (!found)
                return false;
        }
        return true;
    }
    /**
     * @param {string} collectionName The name of the collection in which to get the data
     * @param {Object} filter The filter to get the data
     * @returns The data found
    */
    get(collectionName, filter) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        const json = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        if (!json.data)
            json.data = [];
        for (const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key]);
            if (!found)
                throw new Error('No data found for the given filter');
            return found;
        }
    }
    /**
     * @param {string} collectionName The name of the collection in which to find and update the data
     * @param {Object} filter The filter to find the data
     * @param {Object} data The data to update
     * @param {boolean} upsert If true, only change the data provided, else replace the data with the data provided
    */
    findUpdate(collectionName, filter, data, upsert = false) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        const json = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        if (!json.data)
            json.data = [];
        for (const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key]);
            if (!found)
                throw new Error('No data found for the given filter');
            for (const key in data) {
                // @ts-ignore
                if (json.schema[key] !== typeof data[key])
                    throw new Error(`Key ${key} is of type ${json.schema[key]} and not ${typeof data[key]}`);
            }
            if (upsert === false)
                json.data.splice(json.data.indexOf(found), 1, data);
            else if (upsert === true) {
                for (const key in data) {
                    // @ts-ignore
                    found[key] = data[key];
                }
            }
        }
        fs_1.default.writeFileSync(filePath, JSON.stringify(json));
        return this;
    }
    /**
     * @param {string} collectionName The name of the collection in which to find and delete the data
     * @param {Object} filter The filter to find the data
     * @warning This deletes the data specified permanently
    */
    findDelete(collectionName, filter) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        const json = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        if (!json.data)
            json.data = [];
        for (const key in filter) {
            // @ts-ignore
            const found = json.data.find((arrdata) => arrdata.hasOwnProperty(key) && arrdata[key] === filter[key]);
            if (!found)
                throw new Error('No data found for the given filter');
            json.data.splice(json.data.indexOf(found), 1);
        }
        fs_1.default.writeFileSync(filePath, JSON.stringify(json));
        return this;
    }
    /**
     * @param collectionName The name of the collection in which to find and clear the data
     * @warning This clears all the "data" in the collection
    */
    clear(collectionName) {
        const filePath = `${__classPrivateFieldGet(this, _Database_pathToFolder, "f")}/${collectionName}.json`;
        if (!fs_1.default.existsSync(filePath))
            throw new Error('Collection does not exist');
        const json = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        json.data = [];
        fs_1.default.writeFileSync(filePath, JSON.stringify(json));
        return this;
    }
}
exports.default = Database;
_Database_pathToFolder = new WeakMap();
