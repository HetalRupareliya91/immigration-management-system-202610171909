'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { NaturalizationTestsService } = require('../src/modules/naturalization-tests/naturalization-tests.service');

test('naturalization-tests: creates and retrieves a record', () => {
  const service = new NaturalizationTestsService();
  const created = service.create({ title: 'Sample naturalization-tests record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample naturalization-tests record');
});

test('naturalization-tests: updates status through the lifecycle', () => {
  const service = new NaturalizationTestsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('naturalization-tests: rejects invalid payloads', () => {
  const service = new NaturalizationTestsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});