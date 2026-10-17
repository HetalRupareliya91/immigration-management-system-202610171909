'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { AsylumClaimsService } = require('../src/modules/asylum-claims/asylum-claims.service');

test('asylum-claims: creates and retrieves a record', () => {
  const service = new AsylumClaimsService();
  const created = service.create({ title: 'Sample asylum-claims record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample asylum-claims record');
});

test('asylum-claims: updates status through the lifecycle', () => {
  const service = new AsylumClaimsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('asylum-claims: rejects invalid payloads', () => {
  const service = new AsylumClaimsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});