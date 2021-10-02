const { generateId } = require('../utils/generateId');

module.exports = class Jpg {
  constructor(id, updatedAt, size) {
    this.id = id || generateId();
    this.updatedAt = updatedAt || Date.now();
    this.size = size || 0;
  }

  toPublicJSON() {
    return {
      id: this.id,
      size: this.size ,
      updatedAt: this.updatedAt,
    };
  }
};
