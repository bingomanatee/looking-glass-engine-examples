import React from "react";
import {
  Box,
  Main,
  Header,
  Footer,
  Heading,
  List,
  Grid,
  Button
} from "grommet";
import { withRouter, Switch, Route } from "react-router-dom";

const cells = [
  { title: "Local State", route: "local-state" },
  { title: "Global State", route: "global-state" },
  { title: "API feed", route: "feed" },
];

export default withRouter(function Home({ history }) {
  return (
    <Box gridArea="main">
      <List data={cells}>
        {item => (
          <Box direction="row">
            <Box basis="full">
              <Heading level={2}>{item.title}</Heading>
            </Box>
            <Box>
              <Button onClick={() => history.push(item.route)} plain={false}>
                Go
              </Button>
            </Box>
          </Box>
        )}
      </List>
    </Box>
  );
});
