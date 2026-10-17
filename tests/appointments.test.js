'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { AppointmentsService } = require('../src/modules/appointments/appointments.service');

test('appointments: creates and retrieves a record', () => {
  const service = new AppointmentsService();
  const created = service.create({ title: 'Sample appointments record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample appointments record');
});

test('appointments: updates status through the lifecycle', () => {
  const service = new AppointmentsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('appointments: rejects invalid payloads', () => {
  const service = new AppointmentsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});