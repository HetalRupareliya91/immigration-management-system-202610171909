'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { VisaExtensionsService } = require('../src/modules/visa-extensions/visa-extensions.service');

test('visa-extensions: creates and retrieves a record', () => {
  const service = new VisaExtensionsService();
  const created = service.create({ title: 'Sample visa-extensions record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample visa-extensions record');
});

test('visa-extensions: updates status through the lifecycle', () => {
  const service = new VisaExtensionsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('visa-extensions: rejects invalid payloads', () => {
  const service = new VisaExtensionsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});