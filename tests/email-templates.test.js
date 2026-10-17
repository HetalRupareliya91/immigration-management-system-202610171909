'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { EmailTemplatesService } = require('../src/modules/email-templates/email-templates.service');

test('email-templates: creates and retrieves a record', () => {
  const service = new EmailTemplatesService();
  const created = service.create({ title: 'Sample email-templates record' });
  assert.ok(created.id);
  assert.ok(created.referenceNumber);
  assert.strictEqual(service.get(created.id).title, 'Sample email-templates record');
});

test('email-templates: updates status through the lifecycle', () => {
  const service = new EmailTemplatesService();
  const created = service.create({ title: 'Lifecycle check' });
  const updated = service.update(created.id, { status: 'SUBMITTED' });
  assert.strictEqual(updated.status, 'SUBMITTED');
});

test('email-templates: rejects invalid payloads', () => {
  const service = new EmailTemplatesService();
  assert.throws(() => service.create({ title: 'x' }), /Validation failed/);
  assert.throws(() => service.get('missing-id'), /not found/);
});