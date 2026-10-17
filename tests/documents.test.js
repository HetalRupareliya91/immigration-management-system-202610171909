'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { DocumentsService } = require('../src/modules/documents/documents.service');

test('documents: creates and retrieves a record', () => {
  const service = new DocumentsService();
  const created = service.create({ title: 'Sample documents record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample documents record');
});

test('documents: updates status through the lifecycle', () => {
  const service = new DocumentsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('documents: rejects invalid payloads', () => {
  const service = new DocumentsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});