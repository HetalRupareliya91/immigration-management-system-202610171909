'use strict';

const express = require('express');
const { ConsulatesService } = require('./consulates.service');

const router = express.Router();
const service = new ConsulatesService();

const handle = (fn) => (req, res, next) => {
  try {
    fn(req, res);
  } catch (err) {
    next(err);
  }
};

router.get('/', handle((req, res) => res.json(service.list({ status: req.query.status }))));
router.get('/:id', handle((req, res) => res.json(service.get(req.params.id))));
router.post('/', handle((req, res) => res.status(201).json(service.create(req.body))));
router.patch('/:id', handle((req, res) => res.json(service.update(req.params.id, req.body))));
router.delete('/:id', handle((req, res) => {
  service.remove(req.params.id);
  res.status(204).end();
}));

module.exports = router;