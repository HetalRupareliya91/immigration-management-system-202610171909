'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { StudentVisasService } = require('../src/modules/student-visas/student-visas.service');

test('student-visas: creates and retrieves a record', () => {
  const service = new StudentVisasService();
  const created = service.create({ title: 'Sample student-visas record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample student-visas record');
});

test('student-visas: updates status through the lifecycle', () => {
  const service = new StudentVisasService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('student-visas: rejects invalid payloads', () => {
  const service = new StudentVisasService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});