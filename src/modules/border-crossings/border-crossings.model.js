'use strict';

const STATUSES = Object.freeze(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'ARCHIVED']);

class BorderCrossingsModel {
  constructor(data = {}) {
    const now = new Date().toISOString();
    this.id = data.id || null;
    this.referenceNumber = data.referenceNumber || null;
    this.applicantId = data.applicantId || null;
    this.title = data.title || '';
    this.description = data.description || '';
    this.status = data.status || 'DRAFT';
    this.metadata = data.metadata || {};
    this.createdAt = data.createdAt || now;
    this.updatedAt = data.updatedAt || now;
  }

  toJSON() {
    return { ...this };
  }
}

module.exports = { BorderCrossingsModel, STATUSES, RESOURCE: 'border-crossings' };