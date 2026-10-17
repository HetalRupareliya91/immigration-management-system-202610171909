'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { InvoicesService } = require('../src/modules/invoices/invoices.service');

test('invoices: creates and retrieves a record', () => {
  const service = new InvoicesService();
  const created = service.create({ title: 'Sample invoices record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample invoices record');
});

test('invoices: updates status through the lifecycle', () => {
  const service = new InvoicesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('invoices: rejects invalid payloads', () => {
  const service = new InvoicesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});