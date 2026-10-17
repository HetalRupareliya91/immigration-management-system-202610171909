'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { DepartmentsService } = require('../src/modules/departments/departments.service');

test('departments: creates and retrieves a record', () => {
  const service = new DepartmentsService();
  const created = service.create({ title: 'Sample departments record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample departments record');
});

test('departments: updates status through the lifecycle', () => {
  const service = new DepartmentsService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('departments: rejects invalid payloads', () => {
  const service = new DepartmentsService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});