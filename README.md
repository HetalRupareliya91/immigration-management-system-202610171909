# Immigration Management System

A modular REST API covering the full immigration lifecycle: applicants, visa
applications, residence and work permits, asylum and refugee cases,
citizenship and naturalization, border control, hearings and appeals,
background checks, payments and reporting.

## Stack
- Node.js 18+
- Express 4
- In-memory repositories (swap for a database adapter per module)

## Getting started

    npm install
    npm start        # http://localhost:3000
    npm test

## Structure

    src/app.js                      application bootstrap, auto-loads modules
    src/modules/<name>/             model, validator, repository, service, routes
    tests/<name>.test.js            unit tests per module

Every module is mounted at /api/<name> and exposes:
GET /, GET /:id, POST /, PATCH /:id, DELETE /:id

## Team
- @Hetalrupareliya91 (owner)
- @rajsingh10
- @divyeshfablead