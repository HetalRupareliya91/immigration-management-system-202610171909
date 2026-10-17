'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { PoliceClearancesService } = require('../src/modules/police-clearances/police-clearances.service');

test('police-clearances: creates and retrieves a record', () => {
  const service = new PoliceClearancesService();
  const created = service.create({ title: 'Sample police-clearances record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample police-clearances record');
});

test('police-clearances: updates status through the lifecycle', () => {
  const service = new PoliceClearancesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('police-clearances: rejects invalid payloads', () => {
  const service = new PoliceClearancesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});