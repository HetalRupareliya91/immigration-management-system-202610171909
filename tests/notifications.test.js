'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { NotificationsService } = require('../src/modules/notifications/notifications.service');

test('notifications: creates and retrieves a record', () => {
  const service = new NotificationsService();
  const created = service.create({ title: 'Sample notifications record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample notifications record');
});

test('notifications: updates status through the lifecycle', () => {
  const service = new NotificationsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('notifications: rejects invalid payloads', () => {
  const service = new NotificationsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});