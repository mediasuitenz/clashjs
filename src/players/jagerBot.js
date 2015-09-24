var utils = require('../lib/utils.js');

var DIRECTIONS = ['north', 'east', 'south', 'west'];


var jagerBot = {
  info: {
    name: 'jagerBot',
    style: 2
  },
  ai: (playerState, enemiesStates, gameEnvironment) => {
    var directionToAmmo;

    if (utils.canKill(playerState, enemiesStates) && playerState.ammo) {
      return 'shoot';
    }

    if (!playerState.ammo && gameEnvironment.ammoPosition.length) {
      directionToAmmo = utils.fastGetDirection(playerState.position, findClosestAmmo(playerState.position, gameEnvironment.ammoPosition));

      if (directionToAmmo !== playerState.direction) return directionToAmmo;
      return 'move';
    }

    return utils.fastGetDirection(playerState.position, enemiesStates[0].position)
  }
};



function findClosestAmmo(playerPosition, ammoPositions) {
  var bestDistance = 9999999;
  var best = null;
  for (var ammoPosition of ammoPositions) {
    var d = utils.getDistance(playerPosition, ammoPosition);
    if (d<bestDistance) {
      best=ammoPosition;
      bestDistance=d;
    }
    return best;
  }
}


module.exports = jagerBot;
