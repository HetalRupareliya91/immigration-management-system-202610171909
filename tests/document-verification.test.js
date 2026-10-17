'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { DocumentVerificationService } = require('../src/modules/document-verification/document-verification.service');

test('document-verification: creates and retrieves a record', () => {
  const service = new DocumentVerificationService();
  const created = service.create({ title: 'Sample document-verification record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample document-verification record');
});

test('document-verification: updates status through the lifecycle', () => {
  const service = new DocumentVerificationService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('document-verification: rejects invalid payloads', () => {
  const service = new DocumentVerificationService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});