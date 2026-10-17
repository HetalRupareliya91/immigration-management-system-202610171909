'use strict';

const { ImmigrationJudgesRepository } = require('./immigration-judges.repository');
const { validateImmigrationJudges } = require('./immigration-judges.validator');

function httpError(status, message, details) {
  const err = new Error(message);
  err.status = status;
  if (details) err.details = details;
  return err;
}

class ImmigrationJudgesService {
  constructor(repository = new ImmigrationJudgesRepository()) {
    this.repository = repository;
  }

  list(filters = {}) {
    return this.repository.findAll(filters);
  }

  get(id) {
    const item = this.repository.findById(id);
    if (!item) throw httpError(404, 'immigration-judges record not found');
    return item;
  }

  create(payload) {
    const errors = validateImmigrationJudges(payload);
    if (errors.length) throw httpError(400, 'Validation failed', errors);
    return this.repository.create(payload);
  }

  update(id, payload) {
    this.get(id);
    const errors = validateImmigrationJudges(payload, { partial: true });
    if (errors.length) throw httpError(400, 'Validation failed', errors);
    return this.repository.update(id, payload);
  }

  remove(id) {
    this.get(id);
    this.repository.remove(id);
  }
}

module.exports = { ImmigrationJudgesService };