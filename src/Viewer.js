import { h, Component } from "preact";
import { getEvents, connectToFeed } from "./api";
import Sidebar from "./Sidebar";
import ActiveEventView from "./ActiveEventView.js";
import classNames from "./Viewer.css";

const findEventById = (events, eventID) =>
  events.find(x => x.eventID === eventID);

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      activeEvent: null,
      error: null
    };
    this.onSelectedEvent = this.onSelectedEvent.bind(this);
    this.onEventAdded = this.onEventAdded.bind(this);
  }

  onEventAdded(e) {
    const data = JSON.parse(e);
    const newEvents = [data].concat(this.state.events);
    this.setState({ events: newEvents });
  }

  async componentDidMount() {
    try {
      const events = await getEvents(this.props.namespace);
      this.setState({ loading: false, events });
      connectToFeed(this.props.namespace, this.onEventAdded);
    } catch (e) {
      this.setState({ error: null });
    }
  }

  onSelectedEvent(eventID) {
    this.setState({ activeEvent: eventID });
  }

  getActiveEvent() {
    const { events, activeEvent } = this.state;
    return findEventById(events, activeEvent);
  }

  render() {
    const { events, activeEvent } = this.state;
    return (
      <div className={classNames.viewer}>
        <Sidebar events={events} onClick={this.onSelectedEvent} />
        <ActiveEventView activeEvent={this.getActiveEvent()} />
      </div>
    );
  }
}

export default Viewer;
