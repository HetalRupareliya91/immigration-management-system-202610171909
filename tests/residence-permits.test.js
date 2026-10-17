'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { ResidencePermitsService } = require('../src/modules/residence-permits/residence-permits.service');

test('residence-permits: creates and retrieves a record', () => {
  const service = new ResidencePermitsService();
  const created = service.create({ title: 'Sample residence-permits record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample residence-permits record');
});

test('residence-permits: updates status through the lifecycle', () => {
  const service = new ResidencePermitsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('residence-permits: rejects invalid payloads', () => {
  const service = new ResidencePermitsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});