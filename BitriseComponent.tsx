import { useEffect, useState } from 'react';
import {
  Content,
  Header,
  Page,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
} from '@material-ui/core';
import { useApi, discoveryApiRef } from '@backstage/core-plugin-api';

export const BitriseComponent = () => {
  const discoveryApi = useApi(discoveryApiRef);

  const [builds, setBuilds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const baseUrl = await discoveryApi.getBaseUrl('flowsource-bitrise');
        const appSlug = 'f5d679ef-cf31-4df4-b9e1-b9f8405ec2e8';
        const response = await fetch(`${baseUrl}/builds/${appSlug}`);
        const data = await response.json();
        setBuilds(data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, [discoveryApi]);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return (
    <Page themeId="tool">
      <Header title="Bitrise Builds" subtitle="Latest build status from Bitrise" />
      <Content>
        <Grid container spacing={3}>
          {builds.map((build: any) => (
            <Grid item xs={12} md={6} lg={4} key={build.slug}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Build #{build.build_number}
                  </Typography>
                  <Chip
                    label={build.status_text}
                    color={
                      build.status === 1
                        ? 'primary'
                        : build.status === 2
                        ? 'secondary'
                        : 'default'
                    }
                    style={{ marginBottom: 8 }}
                  />
                  <Typography variant="body2">
                    Repo: {build.repository?.repo || build.repository_url}
                  </Typography>
                  <Typography variant="body2">
                    Triggered by: {build.triggered_by}
                  </Typography>
                  <Typography variant="body2">
                    Commit: {build.commit_message}
                  </Typography>
                  <Typography variant="body2">
                    Finished at: {build.finished_at}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Content>
    </Page>
  );
};