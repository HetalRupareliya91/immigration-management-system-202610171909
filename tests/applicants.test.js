'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { ApplicantsService } = require('../src/modules/applicants/applicants.service');

test('applicants: creates and retrieves a record', () => {
  const service = new ApplicantsService();
  const created = service.create({ title: 'Sample applicants record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample applicants record');
});

test('applicants: updates status through the lifecycle', () => {
  const service = new ApplicantsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('applicants: rejects invalid payloads', () => {
  const service = new ApplicantsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});