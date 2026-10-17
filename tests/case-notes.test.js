'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { CaseNotesService } = require('../src/modules/case-notes/case-notes.service');

test('case-notes: creates and retrieves a record', () => {
  const service = new CaseNotesService();
  const created = service.create({ title: 'Sample case-notes record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample case-notes record');
});

test('case-notes: updates status through the lifecycle', () => {
  const service = new CaseNotesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('case-notes: rejects invalid payloads', () => {
  const service = new CaseNotesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});