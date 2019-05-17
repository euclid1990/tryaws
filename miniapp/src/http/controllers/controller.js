import express from 'express';

export default class Controller {
  constructor() {
    this.router = new express.Router();
    for (const { method, url, middleware, fnName } of this.$routes) {
      this.router[method](url, ...middleware, this[fnName].bind(this));
    }
  }
}
