'use strict';

const { ConsulatesRepository } = require('./consulates.repository');
const { validateConsulates } = require('./consulates.validator');

function httpError(status, message, details) {
  const err = new Error(message);
  err.status = status;
  if (details) err.details = details;
  return err;
}

class ConsulatesService {
  constructor(repository = new ConsulatesRepository()) {
    this.repository = repository;
  }

  list(filters = {}) {
    return this.repository.findAll(filters);
  }

  get(id) {
    const item = this.repository.findById(id);
    if (!item) throw httpError(404, 'consulates record not found');
    return item;
  }

  create(payload) {
    const errors = validateConsulates(payload);
    if (errors.length) throw httpError(400, 'Validation failed', errors);
    return this.repository.create(payload);
  }

  update(id, payload) {
    this.get(id);
    const errors = validateConsulates(payload, { partial: true });
    if (errors.length) throw httpError(400, 'Validation failed', errors);
    return this.repository.update(id, payload);
  }

  remove(id) {
    this.get(id);
    this.repository.remove(id);
  }
}

module.exports = { ConsulatesService };