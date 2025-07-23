import fetch from 'node-fetch';
import { BitriseServiceType } from './types';


export class bitriseService implements BitriseServiceType {
  constructor(public apiToken: string) {}

  async getBuild(appSlug: string):Promise<any> {
    console.log("hidayaToken",this.apiToken);
    const response = await fetch(
      `https://api.bitrise.io/v0.1/apps/${appSlug}/builds`,
      {
        headers: {
          Authorization: `${this.apiToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch build: ${response.statusText}`);
    }

    return await response.json();
  }
}