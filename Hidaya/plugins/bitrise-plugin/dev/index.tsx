import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { bitrisePluginPlugin, BitrisePluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(bitrisePluginPlugin)
  .addPage({
    element: <BitrisePluginPage />,
    title: 'Root Page',
    path: '/bitrise-plugin',
  })
  .render();
