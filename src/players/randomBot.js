var utils = require('../lib/utils.js');

var randomBot = {
  info: {
    name: 'randomBot',
    style: 2
  },
  ai: (playerState, enemiesState, gameEnvironment) => {
    var action = Math.random()

    if (action < 0.3)
      return "shoot"
    if (action > 0.3 && action < 0.6) {
      var randomDir = Math.random()
      if (randomDir < 0.25)
        return 'north'
      if (randomDir > 0.25 && randomDir < 0.5)
        return 'east'
      if (randomDir > 0.5 && randomDir < 0.75)
        return 'south'
      if (randomDir > 0.75)
        return 'west'
    }
    //if (action > 0.6)
    return 'move'
  }
};

module.exports = randomBot;
