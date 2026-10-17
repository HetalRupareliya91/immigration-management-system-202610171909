'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { CountriesService } = require('../src/modules/countries/countries.service');

test('countries: creates and retrieves a record', () => {
  const service = new CountriesService();
  const created = service.create({ title: 'Sample countries record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample countries record');
});

test('countries: updates status through the lifecycle', () => {
  const service = new CountriesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('countries: rejects invalid payloads', () => {
  const service = new CountriesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});