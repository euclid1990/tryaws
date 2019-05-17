import { controller, get } from 'route-decorators';
import Controller from '@controllers/controller';

@controller('/')
export default class HomeController extends Controller {
  @get('/')
  async index(req, res, next) {
    res.render('index');
  }
}
