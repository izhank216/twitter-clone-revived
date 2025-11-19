import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export function initMiddleware(req, res, next) {
  cookieParser()(req, res, () => {});
  bodyParser.json()(req, res, () => {});
  bodyParser.urlencoded({ extended: true })(req, res, () => {});
  next();
}
