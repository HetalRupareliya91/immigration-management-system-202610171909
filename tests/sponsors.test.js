'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { SponsorsService } = require('../src/modules/sponsors/sponsors.service');

test('sponsors: creates and retrieves a record', () => {
  const service = new SponsorsService();
  const created = service.create({ title: 'Sample sponsors record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample sponsors record');
});

test('sponsors: updates status through the lifecycle', () => {
  const service = new SponsorsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('sponsors: rejects invalid payloads', () => {
  const service = new SponsorsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});