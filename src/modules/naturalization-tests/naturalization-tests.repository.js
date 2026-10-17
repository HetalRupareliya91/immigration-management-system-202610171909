'use strict';

const crypto = require('crypto');
const { NaturalizationTestsModel } = require('./naturalization-tests.model');

class NaturalizationTestsRepository {
  constructor() {
    this.items = new Map();
  }

  create(data) {
    const id = crypto.randomUUID();
    const referenceNumber = 'NAT-' + Date.now().toString(36).toUpperCase() + '-' + id.slice(0, 4).toUpperCase();
    const entity = new NaturalizationTestsModel({ ...data, id, referenceNumber });
    this.items.set(id, entity);
    return entity;
  }

  findAll({ status } = {}) {
    const all = [...this.items.values()];
    return status ? all.filter((item) => item.status === status) : all;
  }

  findById(id) {
    return this.items.get(id) || null;
  }

  update(id, changes) {
    const current = this.items.get(id);
    if (!current) return null;
    const updated = new NaturalizationTestsModel({
      ...current,
      ...changes,
      id,
      referenceNumber: current.referenceNumber,
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString(),
    });
    this.items.set(id, updated);
    return updated;
  }

  remove(id) {
    return this.items.delete(id);
  }
}

module.exports = { NaturalizationTestsRepository };