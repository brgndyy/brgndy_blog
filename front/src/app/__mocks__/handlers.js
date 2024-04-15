import { http, HttpResponse } from 'msw';
import PATH_ROUTES from '../_constants/pathRoutes';
import response from './response/index';

export const handlers = [
  ...[PATH_ROUTES.get_all_posts].map((path) =>
    http.get(path, () => {
      return HttpResponse.json(response[path], { status: 200 });
    }),
  ),
];
