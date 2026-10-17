'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { PassportsService } = require('../src/modules/passports/passports.service');

test('passports: creates and retrieves a record', () => {
  const service = new PassportsService();
  const created = service.create({ title: 'Sample passports record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample passports record');
});

test('passports: updates status through the lifecycle', () => {
  const service = new PassportsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('passports: rejects invalid payloads', () => {
  const service = new PassportsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});