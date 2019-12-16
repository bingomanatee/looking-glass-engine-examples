import React from "react";

import { Box, Text, Button } from "grommet";
import dayjs from "dayjs";
import _ from "lodash";

const NAME_RE = /\@[a-z0-9_]{1,15}/i;
const TweetPhrase = ({text, setScreenName}) => {
  if (!(text  && (typeof text === 'string'))) {
    return text || ' ';
  }

  if (NAME_RE.test(text)) {
    let [found] = NAME_RE.exec(text);
    console.log('found: ', found);
    let [first, next] = text.split(found, 2);
    return [<TweetPhrase setScreenName={setScreenName} text={first}/>,
       <a style={{color: 'blue'}} onClick={() => setScreenName(found)}>{found}</a>, 
       <TweetPhrase text={next} setScreenName={setScreenName} />]
  } 
  return text;
};


export default ({ tweet, setScreenName }) => (
  <Box direction="row" flex={true}>
    <Box
      width="8rem"
      pad="0.5rem"
      align="baseline"
      style={{ whiteSpace: "nowrap" }}
    >
      <Text size="small">{dayjs(tweet.created_at).format("MMM D YYYY")}</Text>
    </Box>
    <Box flex={true} pad="0.5rem" align="baseline">
      <Text size="small"><TweetPhrase text={tweet.text} setScreenName={setScreenName} /></Text>
    </Box>
  </Box>
);
