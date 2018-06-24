import { h, Component } from "preact";

const getURL = bin => {
  if (bin.length) {
    return `https://bin.cloudevents.live/ce/${bin}`;
  } else {
    return "";
  }
};

const BinChooser = ({ bin, url, onSubmit, onChange }) => (
  <div>
    <p>
      To begin choose the name of the bin where you will be sending your events.
    </p>
    <form onSubmit={onSubmit}>
      <div>
        Bin name:{" "}
        <input
          type="text"
          placeholder="Bin"
          name="bin"
          pattern="[A-Za-z0-9\-]+"
          onInput={onChange}
        />
      </div>
      <div>
        Send Webhooks to: <input type="text" readonly={true} value={url} />
      </div>
      <input type="submit" value="Go!" />
    </form>
  </div>
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
    const { bin } = this.state.bin;
    this.props.onBinChosen(bin);
  }
}

export default BinChooserImpl;
