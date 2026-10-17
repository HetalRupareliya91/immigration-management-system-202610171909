'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { LanguagesService } = require('../src/modules/languages/languages.service');

test('languages: creates and retrieves a record', () => {
  const service = new LanguagesService();
  const created = service.create({ title: 'Sample languages record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample languages record');
});

test('languages: updates status through the lifecycle', () => {
  const service = new LanguagesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('languages: rejects invalid payloads', () => {
  const service = new LanguagesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});