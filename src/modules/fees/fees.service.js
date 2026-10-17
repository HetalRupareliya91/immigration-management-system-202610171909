'use strict';

const { FeesRepository } = require('./fees.repository');
const { validateFees } = require('./fees.validator');

function httpError(status, message, details) {
  const err = new Error(message);
  err.status = status;
  if (details) err.details = details;
  return err;
}

class FeesService {
  constructor(repository = new FeesRepository()) {
    this.repository = repository;
  }

  list(filters = {}) {
    return this.repository.findAll(filters);
  }

  get(id) {
    const item = this.repository.findById(id);
    if (!item) throw httpError(404, 'fees record not found');
    return item;
  }

  create(payload) {
    const errors = validateFees(payload);
    if (errors.length) throw httpError(400, 'Validation failed', errors);
    return this.repository.create(payload);
  }

  update(id, payload) {
    this.get(id);
    const errors = validateFees(payload, { partial: true });
    if (errors.length) throw httpError(400, 'Validation failed', errors);
    return this.repository.update(id, payload);
  }

  remove(id) {
    this.get(id);
    this.repository.remove(id);
  }
}

module.exports = { FeesService };