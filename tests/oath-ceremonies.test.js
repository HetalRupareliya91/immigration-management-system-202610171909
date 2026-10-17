'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { OathCeremoniesService } = require('../src/modules/oath-ceremonies/oath-ceremonies.service');

test('oath-ceremonies: creates and retrieves a record', () => {
  const service = new OathCeremoniesService();
  const created = service.create({ title: 'Sample oath-ceremonies record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample oath-ceremonies record');
});

test('oath-ceremonies: updates status through the lifecycle', () => {
  const service = new OathCeremoniesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('oath-ceremonies: rejects invalid payloads', () => {
  const service = new OathCeremoniesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});