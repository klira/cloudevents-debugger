import { h, Component } from "preact";

const prettyJSON = x => JSON.stringify(x, null, 4);

class ActiveEventView extends Component {
  render({ activeEvent }) {
    if (!activeEvent) {
      return <p>Pick an event in the sidebar</p>;
    }

    return <pre>{prettyJSON(activeEvent)}</pre>;
  }
}

export default ActiveEventView;
