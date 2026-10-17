'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { InterviewsService } = require('../src/modules/interviews/interviews.service');

test('interviews: creates and retrieves a record', () => {
  const service = new InterviewsService();
  const created = service.create({ title: 'Sample interviews record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample interviews record');
});

test('interviews: updates status through the lifecycle', () => {
  const service = new InterviewsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('interviews: rejects invalid payloads', () => {
  const service = new InterviewsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});