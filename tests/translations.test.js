'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { TranslationsService } = require('../src/modules/translations/translations.service');

test('translations: creates and retrieves a record', () => {
  const service = new TranslationsService();
  const created = service.create({ title: 'Sample translations record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample translations record');
});

test('translations: updates status through the lifecycle', () => {
  const service = new TranslationsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('translations: rejects invalid payloads', () => {
  const service = new TranslationsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});