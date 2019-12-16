import React, { Component } from "react";
import feed from "./feed";
import dayjs from "dayjs";
import _ from 'lodash';

import {
  Box,
  Text,
  Heading,
  TextInput,
  List,
  Button,
  Header,
  Main
} from "grommet";

import Tweet from './Tweet'

export default class TwitterFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { ...feed.values };
  }

  componentDidMount() {
    this._sub = feed.subscribeToValue(state => {
      this.setState(state);
      if (this.props.onChange) {
        this.props.onChange(state);
      }
    });
  }

  componentWillUnmount() {
    if (this._sub) this._sub.unsubscribe();
  }

  render() {
    const { screenName, tweets, loadStatus } = this.state;
    return (
      <>
        <Box direction="column" fill={true}>
          <Header>
            <Box
              direction="row"
              height="4rem"
              fill="horizontal"
              align="baseline"
            >
              <Box basis="1/4" pad="small">
                <Text weight="bold" textAlign="end" flex="1">
                  Screen Name @
                </Text>
              </Box>
              <Box basis="1/2" pad="small">
                <TextInput
                  value={screenName}
                  onChange={e => {
                    feed.do.setScreenName(e.target.value);
                  }}
                />
              </Box>
              <Box basis="1/4" pad="small">
                <Button primary plain={false} onClick={feed.do.loadTweets}>
                  Load
                </Button>
              </Box>
            </Box>
          </Header>
          <div style={{overflow: 'auto', padding: '2rem'}}>
            {loadStatus === "loaded" && (
              <>
                <Heading level="2">Results</Heading>
                {!tweets.length && <Text>No Tweets Found</Text>}

                <List data={tweets} pad="0">
                  {(tweet) => {
                   return <Tweet tweet={tweet} setScreenName={feed.do.loadTweets} />
                  }}
                </List>
  
              </>
                )
            }
            {loadStatus === "unloaded" && (
              <>
                <Heading level="2">Search for a named users' tweets</Heading>
                <Text>Enter a screen name in the field above</Text>
              </>
            )}
            </div>
        </Box>
      </>
    );
  }
}