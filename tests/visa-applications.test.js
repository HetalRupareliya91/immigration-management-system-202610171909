'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { VisaApplicationsService } = require('../src/modules/visa-applications/visa-applications.service');

test('visa-applications: creates and retrieves a record', () => {
  const service = new VisaApplicationsService();
  const created = service.create({ title: 'Sample visa-applications record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample visa-applications record');
});

test('visa-applications: updates status through the lifecycle', () => {
  const service = new VisaApplicationsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('visa-applications: rejects invalid payloads', () => {
  const service = new VisaApplicationsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});