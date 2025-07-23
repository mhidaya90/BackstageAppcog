import express from 'express';
import Router from 'express-promise-router';
import { BitriseServiceType } from './services/BitriseService/types';

export async function createRouter({
bitriseService,
}: {
  bitriseService: BitriseServiceType;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/bitrise/build/:appSlug', async (req, res) => {
    const { appSlug } = req.params;
    const build = await bitriseService.getBuild(appSlug);
    res.json(build);
  });

  return router;
}

