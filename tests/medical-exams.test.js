'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { MedicalExamsService } = require('../src/modules/medical-exams/medical-exams.service');

test('medical-exams: creates and retrieves a record', () => {
  const service = new MedicalExamsService();
  const created = service.create({ title: 'Sample medical-exams record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample medical-exams record');
});

test('medical-exams: updates status through the lifecycle', () => {
  const service = new MedicalExamsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('medical-exams: rejects invalid payloads', () => {
  const service = new MedicalExamsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});