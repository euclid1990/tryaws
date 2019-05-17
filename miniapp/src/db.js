import knex from 'knex';
import utils from '@utils';
import knexfile from './knexfile';
var k;

module.exports = (env = null) => {
  if (env && typeof knexfile[env] === 'object') {
    k = knex(knexfile[env]);
  } else {
    k = knex(knexfile[utils.env('NODE_ENV', 'development')]);
    k.on('query', (data) => {
      let { bindings, sql } = data;
      if (bindings != null && typeof bindings[Symbol.iterator] === 'function') {
        for (let bind of bindings) {
          sql = sql.replace('?', bind);
        }
      }
      console.info(sql);
    });
  }
  return k;
};
