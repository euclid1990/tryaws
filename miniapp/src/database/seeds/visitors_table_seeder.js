const utils = require('@utils');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('visitors').del()
    .then(function() {
      let now = utils.nowUtc();
      // Inserts seed entries
      return knex('visitors').insert([
        { ip: '127.0.0.1', created_at: now }
      ]);
    });
};
