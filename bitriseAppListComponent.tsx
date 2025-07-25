import { useEffect, useState } from 'react';
import { Content, Header, Page, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { useApi, discoveryApiRef } from '@backstage/core-plugin-api';
import { useNavigate } from 'react-router-dom';

export const bitriseAppListComponent = () => {
  const discoveryApi = useApi(discoveryApiRef);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const baseUrl = await discoveryApi.getBaseUrl('flowsource-bitrise');
        const response = await fetch(`${baseUrl}/apps`);
        const data = await response.json();
        setApps(data.data); // Adjust based on actual API response
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [discoveryApi]);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return (
    <Page themeId="tool">
      <Header title="Bitrise Apps" subtitle="Select an app to view builds" />
      <Content>
        <Grid container spacing={3}>
          {apps.map(app => (
            <Grid item xs={12} md={6} lg={4} key={app.slug}>
              <Card onClick={() => navigate(`/bitrise-builds/build/${app.slug}`)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant="h6">{app.title}</Typography>
                  <Typography variant="body2">Owner: {app.repo_owner}</Typography>
                  <Typography variant="body2">Repo URL:{app.repo_url}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Content>
    </Page>
  );
};