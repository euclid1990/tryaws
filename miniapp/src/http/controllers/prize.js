import { controller, get } from 'route-decorators';
import Controller from '@controllers/controller';

@controller('/prizes')
export default class PrizeController extends Controller {
  @get('/')
  async index(req, res, next) {
    res.render('prize/index');
  }

  @get('/register')
  async store(req, res, next) {
    res.render('prize/register');
  }
}
