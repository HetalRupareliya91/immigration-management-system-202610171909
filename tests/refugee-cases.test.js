'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { RefugeeCasesService } = require('../src/modules/refugee-cases/refugee-cases.service');

test('refugee-cases: creates and retrieves a record', () => {
  const service = new RefugeeCasesService();
  const created = service.create({ title: 'Sample refugee-cases record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample refugee-cases record');
});

test('refugee-cases: updates status through the lifecycle', () => {
  const service = new RefugeeCasesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('refugee-cases: rejects invalid payloads', () => {
  const service = new RefugeeCasesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});