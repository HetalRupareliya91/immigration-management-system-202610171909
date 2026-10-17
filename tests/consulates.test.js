'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { ConsulatesService } = require('../src/modules/consulates/consulates.service');

test('consulates: creates and retrieves a record', () => {
  const service = new ConsulatesService();
  const created = service.create({ title: 'Sample consulates record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample consulates record');
});

test('consulates: updates status through the lifecycle', () => {
  const service = new ConsulatesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('consulates: rejects invalid payloads', () => {
  const service = new ConsulatesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});