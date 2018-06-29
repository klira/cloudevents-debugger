import WebSockHop from "websockhop";

// FIXME: This should be configurable
const BASE_URL = "https://bin.cloudevents.live";

const eventsURL = namespace => `${BASE_URL}/api/${namespace}/events`;

// substring(4) cuts out http from the start ws makes it ws. Works for
// both http and https. Probably a bit too clever for production code
const feedURL = namespace =>
  "ws" + `${BASE_URL}/api/${namespace}/feed`.substring(4);

export const getEvents = async ns =>
  (await (await fetch(eventsURL(ns))).json()).events;

const offersAcceptURL = (id, token, offerId) =>
  `${BASE_URL}/${id}/${token}/accept/${offerId}`;

export const connectToFeed = (ns, fn) => {
  const wsh = new WebSockHop(feedURL(ns));
  wsh.on("message", fn);
  wsh.connect()
  return wsh;
};
