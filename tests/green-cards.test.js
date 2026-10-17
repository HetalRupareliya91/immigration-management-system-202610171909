'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { GreenCardsService } = require('../src/modules/green-cards/green-cards.service');

test('green-cards: creates and retrieves a record', () => {
  const service = new GreenCardsService();
  const created = service.create({ title: 'Sample green-cards record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample green-cards record');
});

test('green-cards: updates status through the lifecycle', () => {
  const service = new GreenCardsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('green-cards: rejects invalid payloads', () => {
  const service = new GreenCardsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});