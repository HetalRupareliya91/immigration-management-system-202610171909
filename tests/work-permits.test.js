'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { WorkPermitsService } = require('../src/modules/work-permits/work-permits.service');

test('work-permits: creates and retrieves a record', () => {
  const service = new WorkPermitsService();
  const created = service.create({ title: 'Sample work-permits record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample work-permits record');
});

test('work-permits: updates status through the lifecycle', () => {
  const service = new WorkPermitsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('work-permits: rejects invalid payloads', () => {
  const service = new WorkPermitsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});