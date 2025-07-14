import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const bitrisePlugin = createPlugin({
  id: 'bitrise-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const BitrisePluginPage = bitrisePlugin.provide(
  createRoutableExtension({
    name: 'BitrisePluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
