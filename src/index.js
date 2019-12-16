import React from "react";
import ReactDOM from "react-dom";
import {
  Grommet,
  Box,
  Main,
  Header,
  Footer,
  Heading,
  List,
  Grid
} from "grommet";
import {Home as HomeIcon} from 'grommet-icons';
import theme from "./theme";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Home from "./Home";
import LocalState from "./local-state";
import GlobalState from './global-state';
import Feed from './feed';

import "./styles.css";

const cells = [{ title: "Local State", route: "app" }];

const App = withRouter(function ({history}) {
  return (
      <Grommet id="grommet" theme={theme}>
        <Grid
          fill="vertical"
          rows={["5rem", "auto", "5rem"]}
          columns={["auto"]}
          areas={[
            { name: "head", start: [0, 0], end: [0, 0] },
            { name: "main", start: [0, 1], end: [0, 1] },
            { name: "foot", start: [0, 2], end: [0, 2] }
          ]}
        >
          <Header gridArea="head" pad="small" background="dark-1">
            <Box direction="row" align="center">
            <Box pad="small"><HomeIcon onClick={() => {history.push('/')}} /></Box>
            <Heading margin="small" style={{ fontSize: "1.5rem" }}>
              Looking-glass-engine examples
            </Heading>
            </Box>
          </Header>
          <Box gridArea="main">
            <Switch>
              <Route path="/local-state" component={LocalState} />
              <Route path="/global-state" component={GlobalState} />
              <Route path="/feed" component={Feed} />
              <Route component={Home} />
            </Switch>
          </Box>
          <Footer gridArea="foot" pad="small">
            Use case examples of the Looking Glass Engine
          </Footer>
        </Grid>
      </Grommet>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<Router><App /></Router>, rootElement);
