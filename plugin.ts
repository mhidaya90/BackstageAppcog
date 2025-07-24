import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef, buildsRouteRef } from './routes';

export const flowsourceBitriseFrontendPlugin = createPlugin({
  id: 'flowsource-bitrise',
  routes: {
    root: rootRouteRef,
    build: buildsRouteRef,
  },
});

// export const FlowsourceBitriseFrontendPage = flowsourceBitriseFrontendPlugin.provide(
//   createRoutableExtension({
//     name: 'FlowsourceBitriseFrontendPage',
//     component: () =>
//       import('./components/BitriseComponent').then(m => m.BitriseComponent),
//     mountPoint: rootRouteRef,
//   }),
// );

export const FlowsourceBitriseAppListPage = flowsourceBitriseFrontendPlugin.provide(
  createRoutableExtension({
    name: 'FlowsourceBitriseAppListPage',
    component: () =>
      import('./components/bitriseAppListComponent').then(m => m.bitriseAppListComponent),
    mountPoint: rootRouteRef,
  }),
);

export const FlowsourceBitriseBuildsPage = flowsourceBitriseFrontendPlugin.provide(
  createRoutableExtension({
    name: 'FlowsourceBitriseBuildsPage',
    component: () =>
      import('./components/bitriseBuildListComponent').then(m => m.bitriseBuildListComponent),
    mountPoint: buildsRouteRef,
  }),
);
