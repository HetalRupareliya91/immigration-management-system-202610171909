'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { AppealsService } = require('../src/modules/appeals/appeals.service');

test('appeals: creates and retrieves a record', () => {
  const service = new AppealsService();
  const created = service.create({ title: 'Sample appeals record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample appeals record');
});

test('appeals: updates status through the lifecycle', () => {
  const service = new AppealsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('appeals: rejects invalid payloads', () => {
  const service = new AppealsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});