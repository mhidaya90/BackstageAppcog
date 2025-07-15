import React, { useEffect, useState } from 'react';
import { Content, Header, Page } from '@backstage/core-components';
import { Typography, CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';

export const BitrisePage = () => {
  const [builds, setBuilds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await fetch('/api/proxy/bitrise/apps/YOUR_APP_SLUG/builds');
        const data = await response.json();
        setBuilds(data.data);
      } catch (err) {
        setError('Failed to fetch Bitrise builds.');
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  return (
    <Page themeId="tool">
      <Header title="Bitrise Builds" subtitle="Latest CI/CD runs from Bitrise" />
      <Content>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List>
            {builds.map(build => (
              <ListItem key={build.slug} button component="a" href={build.build_url} target="_blank">
                <ListItemText
                  primary={`#${build.build_number} - ${build.status_text}`}
                  secondary={`Triggered by: ${build.triggered_by} | Branch: ${build.branch}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Page>
  );
};
