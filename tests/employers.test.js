'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { EmployersService } = require('../src/modules/employers/employers.service');

test('employers: creates and retrieves a record', () => {
  const service = new EmployersService();
  const created = service.create({ title: 'Sample employers record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample employers record');
});

test('employers: updates status through the lifecycle', () => {
  const service = new EmployersService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('employers: rejects invalid payloads', () => {
  const service = new EmployersService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});