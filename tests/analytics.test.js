'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { AnalyticsService } = require('../src/modules/analytics/analytics.service');

test('analytics: creates and retrieves a record', () => {
  const service = new AnalyticsService();
  const created = service.create({ title: 'Sample analytics record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample analytics record');
});

test('analytics: updates status through the lifecycle', () => {
  const service = new AnalyticsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('analytics: rejects invalid payloads', () => {
  const service = new AnalyticsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});