import {ValueStream} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
const ROOT_URL = 'https://us-central1-twitter-proxy.cloudfunctions.net/twitter/';
const STATUSES = 'statuses/user_timeline.json?screen_name=';
const feed = new ValueStream('feed');
feed
  .addAction('loadTweets', async (stream, screenName) => {
    if (screenName && typeof screenName === 'string') {
      stream.do.setScreenName(screenName);
    }
    if (!stream.my.screenName) {
      stream.do.setLoadError({
        error: new Error('attempt to load tweets without user')
      });
      return;
    }
    stream.do.setLoadStatus('loading');
    try {
        let t = setTimeout(() => {
          console.log('tweet took too long: ');
          stream.do.setLoadError({error: new Error('tweets took too long')});
          stream.do.setLoadStatus('error');
         t = null;
        }, 5000);

      const {data} = await axios.get(ROOT_URL + STATUSES + stream.my.screenName + '&count=100');
      if (t) {
        clearTimeout(t);
      } else {
        return;
      }
      if (Array.isArray(data)) {
        stream.do.setTweets(data);
      } else {
        stream.do.setTweets([]);
      }
      stream.do.setLoadStatus('loaded');
    } catch (err) {
      console.log('tweet error: ', err);
      stream.do.setLoadError(err);
      stream.do.setLoadStatus('error');
    }
  })
  .addProp('loadStatus', 'unloaded', 'string')
  .addProp('loadError', false)
  .addProp('screenName', '', 'string')
  .addProp('tweets', []);

export default feed;
