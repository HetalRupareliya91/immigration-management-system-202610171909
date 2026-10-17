'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { AttorneysService } = require('../src/modules/attorneys/attorneys.service');

test('attorneys: creates and retrieves a record', () => {
  const service = new AttorneysService();
  const created = service.create({ title: 'Sample attorneys record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample attorneys record');
});

test('attorneys: updates status through the lifecycle', () => {
  const service = new AttorneysService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('attorneys: rejects invalid payloads', () => {
  const service = new AttorneysService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});