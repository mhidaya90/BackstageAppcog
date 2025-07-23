import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { bitriseService } from './services/BitriseService';

/**
 * flowsourceBitrisePlugin backend plugin
 *
 * @public
 */
export const flowsourceBitrisePlugin = createBackendPlugin({
  pluginId: 'flowsource-bitrise',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        catalog: catalogServiceRef,
      },
      async init({ httpRouter }) {
        console.log("hidaya token is ==============================>",process.env.BITRISE_AUTH_TOKEN);
        const bitriseServiceInstance = new bitriseService(
          process.env.BITRISE_AUTH_TOKEN!,
        );

        httpRouter.use(
          await createRouter({
            bitriseService: bitriseServiceInstance,
          }),
        );
      },
    });
  },
});