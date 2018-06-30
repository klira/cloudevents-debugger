import { h, Component } from "preact";
import { route } from "preact-router";
import classNames from "./BinChoser.css";

const getURL = bin => {
  if (bin.length) {
    return `https://bin.cloudevents.live/ce/${bin}`;
  } else {
    return "";
  }
};

const BinChooser = ({ bin, url, onSubmit, onChange }) => (
  <form onSubmit={onSubmit} className={classNames.form}>
    <h2>Name your bin</h2>
    <p className={classNames.info}>
      To begin choose the name of the bin where you will be sending your events.
      You then send webhooks to that bin.
    </p>
    <div>Bin name: </div>
    <input
      autofocus
      type="text"
      placeholder="Bin"
      name="bin"
      pattern="[A-Za-z0-9\-]+"
      onInput={onChange}
    />
    <div>Send Webhooks to:</div>
    <input type="text" readonly={true} value={url} />
    <input type="submit" value="Go!" />
  </form>
);

class BinChooserImpl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bin: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const { bin } = this.state;
    return (
      <BinChooser
        bin={bin}
        url={getURL(bin)}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
    );
  }

  onChange(e) {
    this.setState({ bin: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { bin } = this.state;
    route(`/v/${bin}`);
  }
}

export default BinChooserImpl;
