'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { PortsOfEntryService } = require('../src/modules/ports-of-entry/ports-of-entry.service');

test('ports-of-entry: creates and retrieves a record', () => {
  const service = new PortsOfEntryService();
  const created = service.create({ title: 'Sample ports-of-entry record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample ports-of-entry record');
});

test('ports-of-entry: updates status through the lifecycle', () => {
  const service = new PortsOfEntryService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('ports-of-entry: rejects invalid payloads', () => {
  const service = new PortsOfEntryService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});