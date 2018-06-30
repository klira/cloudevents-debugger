import io from 'socket.io-client';

const BASE_URL = "https://bin.cloudevents.live" || process.env.BIN_BASE_URL;

const socket = io(BASE_URL, {
  transports: ['websocket']
});

const eventTable = []

socket.on("event", ({ns, event}) => {
  eventTable
    .filter(x => x.ns === ns)
    .map(x => x.fn)
    .forEach(fn => fn(event))
})

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
  socket.emit("join", { room: ns })
  eventTable.push({ ns, fn })
};
