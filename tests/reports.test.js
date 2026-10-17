'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { ReportsService } = require('../src/modules/reports/reports.service');

test('reports: creates and retrieves a record', () => {
  const service = new ReportsService();
  const created = service.create({ title: 'Sample reports record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample reports record');
});

test('reports: updates status through the lifecycle', () => {
  const service = new ReportsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('reports: rejects invalid payloads', () => {
  const service = new ReportsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});