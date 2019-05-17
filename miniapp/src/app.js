import http from 'http';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import merge from 'lodash/merge';
import defaultConfig from '@config';
import { requireDir } from '@utils';
import maintenceMode from '@middlewares/maintenance-mode';

export default class App {
  constructor(config) {
    this._cwd = path.dirname(__filename);
    this._app = new express();
    this._app.config = merge(defaultConfig, config);
    this._middlewares = [maintenceMode];
    this._configure(this._app);
    this._httpServer = http.createServer(this._app);
  }

  listen() {
    const { port, host } = this._app.config;

    this._httpServer.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }

  server() {
    return this._httpServer;
  }

  _initView(app) {
    const nunEnv = nunjucks.configure(
      path.join(this._cwd, 'views/'),
      {
        ext: 'html',
        autoescape: true,
        cache: false,
        watch: true,
        writeResponse: true,
        express: app
      }
    );
    app.engine('html', nunjucks.render);
    app.set('view engine', 'html');
    return nunEnv;
  }

  _initRoutes() {
    const classes = requireDir(path.join(this._cwd, './http/controllers'), ['controller.js']);
    const controllers = classes.map(Controller => new Controller.default());
    const router = new express.Router();

    for (const controller of controllers) {
      router.use(this._middlewares, controller.router);
    }

    return router;
  }

  _configure(app) {
    app.use(morgan(app.config.logger));
    const view = this._initView(app); /* eslint-disable-line no-unused-vars */
    const routes = this._initRoutes();
    app.use(routes);
  }
}
