'use strict';

const { STATUSES } = require('./asylum-claims.model');

function validateAsylumClaims(input, { partial = false } = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return ['payload must be an object'];
  }
  if (!partial || input.title !== undefined) {
    if (typeof input.title !== 'string' || input.title.trim().length < 3) {
      errors.push('title must be at least 3 characters');
    }
  }
  if (input.status !== undefined && !STATUSES.includes(input.status)) {
    errors.push('status must be one of ' + STATUSES.join(', '));
  }
  if (input.applicantId !== undefined && input.applicantId !== null && typeof input.applicantId !== 'string') {
    errors.push('applicantId must be a string');
  }
  return errors;
}

module.exports = { validateAsylumClaims };