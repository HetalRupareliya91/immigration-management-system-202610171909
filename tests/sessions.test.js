'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { SessionsService } = require('../src/modules/sessions/sessions.service');

test('sessions: creates and retrieves a record', () => {
  const service = new SessionsService();
  const created = service.create({ title: 'Sample sessions record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample sessions record');
});

test('sessions: updates status through the lifecycle', () => {
  const service = new SessionsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('sessions: rejects invalid payloads', () => {
  const service = new SessionsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});