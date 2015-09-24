const MIN_AMMO = 2;
var utils = require('../lib/utils.js');

function moveTowards(playerState, target) {
  var dir = utils.fastGetDirection(playerState.position, target);
  if(playerState.direction !== dir) {
    return dir;
  } else {
    return 'move';
  }
}

function moveTowardsClosestAmmo(playerState, gameEnvironment) {
  var sorted = gameEnvironment.ammoPosition.sort((a,b) => {
    return utils.getDistance(playerState.position,a);
  });

  return moveTowards(playerState, sorted[0]);
}

var gerbil = {
  info: {
    name: 'gerbil',
    style: 1
  },
  ai: (playerState, enemiesStates, gameEnvironment) => {
    var directionToAmmo;

    if (utils.canKill(playerState, enemiesStates) && playerState.ammo) {
      return 'shoot';
    }
    if (gameEnvironment.ammoPosition.length) {
      return moveTowardsClosestAmmo(playerState, gameEnvironment);
    }
    return moveTowards(playerState.position, [0,0]);
  }
};

module.exports = gerbil;
