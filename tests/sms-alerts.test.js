'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { SmsAlertsService } = require('../src/modules/sms-alerts/sms-alerts.service');

test('sms-alerts: creates and retrieves a record', () => {
  const service = new SmsAlertsService();
  const created = service.create({ title: 'Sample sms-alerts record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample sms-alerts record');
});

test('sms-alerts: updates status through the lifecycle', () => {
  const service = new SmsAlertsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('sms-alerts: rejects invalid payloads', () => {
  const service = new SmsAlertsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});