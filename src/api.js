// FIXME: This should be configurable
const BASE_URL = "https://bin.cloudevents.live";

const eventsURL = namespace => `${BASE_URL}/api/${namespace}/events`;

export const getEvents = async ns =>
  (await (await fetch(eventsURL(ns))).json()).events;

const offersAcceptURL = (id, token, offerId) =>
  `${BASE_URL}/${id}/${token}/accept/${offerId}`;
