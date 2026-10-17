'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { EmbassiesService } = require('../src/modules/embassies/embassies.service');

test('embassies: creates and retrieves a record', () => {
  const service = new EmbassiesService();
  const created = service.create({ title: 'Sample embassies record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample embassies record');
});

test('embassies: updates status through the lifecycle', () => {
  const service = new EmbassiesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('embassies: rejects invalid payloads', () => {
  const service = new EmbassiesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});