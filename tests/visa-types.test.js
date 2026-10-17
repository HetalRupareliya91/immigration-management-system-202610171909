'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { VisaTypesService } = require('../src/modules/visa-types/visa-types.service');

test('visa-types: creates and retrieves a record', () => {
  const service = new VisaTypesService();
  const created = service.create({ title: 'Sample visa-types record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample visa-types record');
});

test('visa-types: updates status through the lifecycle', () => {
  const service = new VisaTypesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('visa-types: rejects invalid payloads', () => {
  const service = new VisaTypesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});