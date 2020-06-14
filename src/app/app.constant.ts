import { environment } from 'src/environments/environment';

export const APP_CONSTANT = {
  HOST_URL: environment.apiUrl,
  GET_SOLUTIONS_URL: 'v1/getsolution',
  REPORT_URL: 'v1/report',
  SEARCH_URL: 'v1/search',
  UPDATE_URL : 'v1/update-request',
  ITEMSPERPAGE: 3,
  NEWPOST_URL: 'v1/new-posts',
  SUPER_ADMIN: ['satnammca@gmail.com']
};
