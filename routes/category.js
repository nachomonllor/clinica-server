const express = require('express');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const _ = require('lodash');
const mdAuthentication = require('../middlewares/authentication');
// const jwt = require('jsonwebtoken');
// const SEED = require('../config/config').SEED;
const Category = require('../models/category');
// const flatten = require('tree-flatten');
const app = express();

app.get('/', mdAuthentication.verifyToken, (req, res, next) => {
  Category.find({ user: req.user._id }, 'name icon slug parent')
    .sort({
      parent: 1,
    })
    .exec((err, categories) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error cargando categorías',
          errors: err,
        });
      }

      // function getCategoriesFlatten(result) {
      //   categories.map((category) => {
      //     result = result.concat(flatten(category, 'children'));
      //   });
      //   return result.map(r => r._doc);
      // }
      // var categoriesList = reduced.map(function(item) {
      //   return item.name
      // }).join(', ');

      // let categoriesFlatten = flatten(categories[0], 'children');
      res.status(200).json({
        ok: true,
        categories,
        total: categories.length,
      });
      // debugger
      // var reduced = flatten(categories, function(item) {
      //     return { _id: item._id, name: item.name };
      // });

      // // print(reduced.map(function(item) { return item.name }).join(', '));

      // function flatten(category, reducerFn, result) {
      //   result = result || [];
      //   if (category === undefined) return result;

      //   return flatten(category.children, reducerFn, result.concat([reducerFn(category)]));
      // }
    });
});
app.put('/:id', [mdAuthentication.verifyToken, mdAuthentication.verifyAdminOrSelfUser], (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Category.findById(id, (err, category) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al buscar categoría',
        errors: err,
      });
    }
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: `El categoría con el id ${id} no existe`,
        errors: { message: 'No existe el categoría con ese ID' },
      });
    }

    category.name = body.name;
    category.icon = body.lastname;
    category.slug = slugify(category.name, '-');
    category.save((err, categoryUpdated) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: 'Error al actualizar categoría',
          errors: err,
        });
      }
      // userUpdated.password = ':P';
      res.status(200).json({
        ok: true,
        category: categoryUpdated,
      });
    });
  });
});
app.post('/', mdAuthentication.verifyToken, (req, res, next) => {
  const { body } = req;
  let category;
  // if (!body.parent) {
  // category = new Category({
  //   name: body.name,
  //   icon: body.icon,
  //   slug: slugify(body.name, '-'),
  //   user_parent: req.user._id
  // });

  Category.create({
    name: body.name,
    icon: body.icon,
    slug: slugify(body.name, '-'),
    parent: body.parent,
    user: req.user._id,
  }, (err, categorySaved) => {
    // doc.children[0]._id will be undefined
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear categoría',
        errors: err,
      });
    }
    return res.status(201).json({
      ok: true,
      category: categorySaved,
      // userToken: req.user
    });
  });
});

app.delete('/:id', mdAuthentication.verifyToken, (req, res) => {
  const { id } = req.params;
  const parent = req.query.parent || null;
  Category.findByIdAndRemove(id, (err, categoryDeleted) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al borrar categoría',
        errors: err,
      });
    }
    if (!categoryDeleted) {
      return res.status(400).json({
        ok: false,
        message: `El categoría con el id ${id} no existe`,
        errors: { message: `El categoría con el id ${id} no existe` },
      });
    }
    if (!parent) {
      return res.status(200).json({
        ok: true,
        category: categoryDeleted,
      });
    }

    Category.findByIdAndUpdate({ _id: parent }, { $pull: { children: id } }, { safe: true, upsert: true },
      (err, categoryParent) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message: 'Error al borrar categoría padre',
            errors: err,
          });
        }
        if (!categoryParent) {
          return res.status(400).json({
            ok: false,
            message: `El categoría con el id ${id} no existe`,
            errors: { message: `El categoría con el id ${id} no existe` },
          });
        }
        return res.status(200).json({
          ok: true,
          category: categoryDeleted,
        });
      });
  });
});
module.exports = app;
