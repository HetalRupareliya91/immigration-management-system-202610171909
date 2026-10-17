'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { CaseOfficersService } = require('../src/modules/case-officers/case-officers.service');

test('case-officers: creates and retrieves a record', () => {
  const service = new CaseOfficersService();
  const created = service.create({ title: 'Sample case-officers record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample case-officers record');
});

test('case-officers: updates status through the lifecycle', () => {
  const service = new CaseOfficersService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('case-officers: rejects invalid payloads', () => {
  const service = new CaseOfficersService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});