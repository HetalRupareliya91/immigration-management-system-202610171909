'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { FamilySponsorshipService } = require('../src/modules/family-sponsorship/family-sponsorship.service');

test('family-sponsorship: creates and retrieves a record', () => {
  const service = new FamilySponsorshipService();
  const created = service.create({ title: 'Sample family-sponsorship record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample family-sponsorship record');
});

test('family-sponsorship: updates status through the lifecycle', () => {
  const service = new FamilySponsorshipService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('family-sponsorship: rejects invalid payloads', () => {
  const service = new FamilySponsorshipService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});