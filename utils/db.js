const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");
const { v4: uuid } = require("uuid");

class Db {
  constructor(dbFilename) {
    this.dbFilename = join(__dirname, "../data", dbFilename);
    this._load();
  }

  async _load() {
    this._data = JSON.parse(await readFile(this.dbFilename, "utf8"));
  }

  _save() {
    writeFile(this.dbFilename, JSON.stringify(this._data), "utf8");
  }

  create(obj) {
    const id = uuid();
    this._data.push({ id, ...obj });
    this._save();
    return id;
  }

  getAll() {
    return this._data;
  }

  getOne(id) {
    return this._data.find((oneObj) => oneObj.id === id);
  }

  update(id, newObj) {
    this._data = this._data.map((oneObj) =>
      oneObj.id === id
        ? {
            ...oneObj,
            ...oneObj,
          }
        : oneObj,
    );
    this._save();
  }

  delete(id) {
    this._data = this._data.filter((oneObj) => oneObj.id !== id);
    this._save();
  }
}

const db = new Db("client.json");

module.exports = {
  db,
};
