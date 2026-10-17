'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { AuditLogsService } = require('../src/modules/audit-logs/audit-logs.service');

test('audit-logs: creates and retrieves a record', () => {
  const service = new AuditLogsService();
  const created = service.create({ title: 'Sample audit-logs record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample audit-logs record');
});

test('audit-logs: updates status through the lifecycle', () => {
  const service = new AuditLogsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('audit-logs: rejects invalid payloads', () => {
  const service = new AuditLogsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});