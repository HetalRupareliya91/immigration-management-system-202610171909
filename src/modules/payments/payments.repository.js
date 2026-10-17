'use strict';

const crypto = require('crypto');
const { PaymentsModel } = require('./payments.model');

class PaymentsRepository {
  constructor() {
    this.items = new Map();
  }

  create(data) {
    const id = crypto.randomUUID();
    const referenceNumber = 'PAY-' + Date.now().toString(36).toUpperCase() + '-' + id.slice(0, 4).toUpperCase();
    const entity = new PaymentsModel({ ...data, id, referenceNumber });
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
    const updated = new PaymentsModel({
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

module.exports = { PaymentsRepository };