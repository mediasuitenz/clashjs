var React = require('react');
var R = require('ramda');

var Clash = require('./components/Clash');
var App = React.createClass({

  getInitialState() {
    return {
        players: require('./Players.js'),
        hasSelectedPlayers: false
    };
  },

  render() {
    const { setState, state } = this;

    if (!state.hasSelectedPlayers) {
      return <div style={{
        border: "1px solid black",
        backgroundColor: "white",
        position: "absolute",
        color: "black",
        width: "60%",
        zIndex: 999,
        top: 100,
        left: "20%"
      }}>
        select players
        { R.toPairs(state.players).map(function (pair, key) {
          var name = pair[0];
          return <div key={key}>
            <button onClick={event => {
              const players = R.dissoc(name, state.players);
              setState({ players });
            }} children="x" />
            {name}
          </div>;
        }) }
        <button onClick={event => setState({ hasSelectedPlayers: true }) }>
          Start
        </button>
      </div>;
    }

    return (
      <Clash players={this.state.players}/>
    );
  }

});

module.exports = App;
