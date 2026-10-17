'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { BiometricsService } = require('../src/modules/biometrics/biometrics.service');

test('biometrics: creates and retrieves a record', () => {
  const service = new BiometricsService();
  const created = service.create({ title: 'Sample biometrics record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample biometrics record');
});

test('biometrics: updates status through the lifecycle', () => {
  const service = new BiometricsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('biometrics: rejects invalid payloads', () => {
  const service = new BiometricsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});