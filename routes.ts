import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'bitrise-app-list',
});

export const buildsRouteRef = createRouteRef({
  id : 'bitrise-builds',
  params : ['appSlug'],
});