import { h, Component } from "preact";
import classNames from "./Sidebar.css";

class SidebarEvent extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick(this.props.eventID);
  }
  render({ eventType, eventID }) {
    return (
      <div onClick={this.onClick} className={classNames.event}>
        {eventType}/{eventID}
      </div>
    );
  }
}

const Sidebar = ({ events, onClick }) => (
  <div className={classNames.sidebar}>
    <div>CloudEvents.live</div>
    {events.map(x => (
      <SidebarEvent
        key={x.eventID}
        onClick={onClick}
        eventType={x.eventType}
        eventTime={x.eventTime}
        eventID={x.eventID}
      />
    ))}
  </div>
);

export default Sidebar;
