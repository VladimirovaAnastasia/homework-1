const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const Jpg = require('./Jpg');

class Database extends EventEmitter {
  constructor() {
    super();

    this.idToJpg = {};
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.idToJpg === 'object') {
      this.idToJpg = {};

      for (let id in dump.idToJpg) {
        const jpg = dump.idToJpg[id];

        this.idToJpg[id] = new Jpg(jpg.id, jpg.updatedAt, jpg.size);
      }
    }
  }

  async insert(jpg) {
    this.idToJpg[jpg.id] = jpg;

    this.emit('changed');
  }

  async insertJpg(jpg) {
    this.idToJpg[jpg.id] = jpg;

    this.emit('changed');
  }

  async remove(jpgId) {
    delete this.idToJpg[jpgId];
    this.emit('changed');

    return jpgId;
  }

  findOne(jpgId) {
    const jpgRaw = this.idToJpg[jpgId];

    if (!jpgRaw) {
      return null;
    }

    return new Jpg(jpgRaw.id, jpgRaw.updatedAt, jpgRaw.size);
  }

  find() {
    let allJpgs = Object.values(this.idToJpg);

    allJpgs.sort((jpgA, jpgB) => jpgB.updatedAt - jpgA.updatedAt);

    return allJpgs;
  }

  toJSON() {
    return {
      idToJpg: this.idToJpg,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
