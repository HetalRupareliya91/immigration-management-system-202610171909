'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { CitizenshipApplicationsService } = require('../src/modules/citizenship-applications/citizenship-applications.service');

test('citizenship-applications: creates and retrieves a record', () => {
  const service = new CitizenshipApplicationsService();
  const created = service.create({ title: 'Sample citizenship-applications record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample citizenship-applications record');
});

test('citizenship-applications: updates status through the lifecycle', () => {
  const service = new CitizenshipApplicationsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('citizenship-applications: rejects invalid payloads', () => {
  const service = new CitizenshipApplicationsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});