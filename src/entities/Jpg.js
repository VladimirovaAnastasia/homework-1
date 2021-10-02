const { generateId } = require('../utils/generateId');

module.exports = class Jpg {
  constructor(id, updatedAt, size, mimetype) {
    this.id = id || generateId();
    this.updatedAt = updatedAt || Date.now();
    this.size = size || 0;
    this.mimeType = mimetype;
  }

  toPublicJSON() {
    return {
      id: this.id,
      updatedAt: this.updatedAt,
      size: this.size,
      mimeType: this.mimeType,
    };
  }
};
