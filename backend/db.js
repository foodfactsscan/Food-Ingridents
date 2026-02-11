/**
 * Simple JSON File-based Database
 * Persists data to JSON files in /backend/data/ folder
 * Data survives server restarts — no external DB needed
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('📂 Created data directory:', DATA_DIR);
}

class JsonDB {
    constructor(filename) {
        this.filePath = path.join(DATA_DIR, `${filename}.json`);
        this.data = this._load();
    }

    /** Load data from file or initialize empty */
    _load() {
        try {
            if (fs.existsSync(this.filePath)) {
                const raw = fs.readFileSync(this.filePath, 'utf-8');
                const parsed = JSON.parse(raw);
                console.log(`📄 Loaded ${Object.keys(parsed).length} records from ${path.basename(this.filePath)}`);
                return parsed;
            }
        } catch (err) {
            console.error(`⚠️ Error loading ${this.filePath}:`, err.message);
        }
        return {};
    }

    /** Save data to file (atomic write) */
    _save() {
        try {
            const tempPath = this.filePath + '.tmp';
            fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
            fs.renameSync(tempPath, this.filePath);
        } catch (err) {
            console.error(`⚠️ Error saving ${this.filePath}:`, err.message);
        }
    }

    /** Check if key exists */
    has(key) {
        return key in this.data;
    }

    /** Get record by key */
    get(key) {
        return this.data[key] || null;
    }

    /** Set/update record by key */
    set(key, value) {
        this.data[key] = value;
        this._save();
    }

    /** Delete record by key */
    delete(key) {
        if (key in this.data) {
            delete this.data[key];
            this._save();
            return true;
        }
        return false;
    }

    /** Get all records */
    getAll() {
        return { ...this.data };
    }

    /** Count records */
    count() {
        return Object.keys(this.data).length;
    }
}

// Create database instances
const usersDB = new JsonDB('users');
const profilesDB = new JsonDB('profiles');

export { usersDB, profilesDB, JsonDB };
export default { usersDB, profilesDB };
