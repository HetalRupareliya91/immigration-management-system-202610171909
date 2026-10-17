'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { DeportationCasesService } = require('../src/modules/deportation-cases/deportation-cases.service');

test('deportation-cases: creates and retrieves a record', () => {
  const service = new DeportationCasesService();
  const created = service.create({ title: 'Sample deportation-cases record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample deportation-cases record');
});

test('deportation-cases: updates status through the lifecycle', () => {
  const service = new DeportationCasesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('deportation-cases: rejects invalid payloads', () => {
  const service = new DeportationCasesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});