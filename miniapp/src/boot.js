import register from 'module-alias';
import path from 'path';

register.addAliases({
  '@root': __dirname,
  '@db': path.resolve(__dirname, 'db'),
  '@config': path.resolve(__dirname, 'config'),
  '@utils': path.resolve(__dirname, 'utils'),
  '@controllers': path.resolve(__dirname, 'http/controllers'),
  '@middlewares': path.resolve(__dirname, 'http/middlewares')
});

register();
