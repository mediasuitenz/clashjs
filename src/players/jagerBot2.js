
//JagerBot
var utils = require('../lib/utils.js');


var jagerBot = {
  info: {
    name: 'jagerBot2',
    style: 3
  },
  ai: (playerState, enemiesStates, gameEnvironment) => {
    var directionToAmmo;

    if (utils.canKill(playerState, enemiesStates) && playerState.ammo) {
      return 'shoot';
    }

    if (playerState.ammo) {
      var couldKillNextTurn = []
      enemiesStates.forEach(function (enemy) {
        if (enemy.isAlive) {
          var enemyNextPos = nextPos(enemy.position, enemy.direction, gameEnvironment)
          DIRECTIONS.forEach(function (dir) {
            if (utils.isVisible(playerState.position, enemyNextPos, dir)) {
              couldKillNextTurn.push({
                enemy: enemy,
                dirToFace: dir
              });
            }
          });
        }
      });

      if (couldKillNextTurn.length) {
        // console.log('COULD KILL NEXT', couldKillNextTurn)
        return couldKillNextTurn[0].dirToFace
      }
    }

    if (!playerState.ammo && gameEnvironment.ammoPosition.length) {
      directionToAmmo = utils.fastGetDirection(playerState.position, findClosestAmmo(playerState.position, gameEnvironment.ammoPosition));

      if (directionToAmmo !== playerState.direction) return directionToAmmo;
      return 'move';
    }

    return utils.fastGetDirection(playerState.position, enemiesStates[0].position)
  }
};

var DIRECTIONS = ['north', 'east', 'south', 'west'];

/**
 * Calculates the next position if the ship is in currentPos and moves in direction
 * @param  {Array} currentPos       e.g. playerState.position or enemy.position
 * @param  {String} direction       e.g. 'north'
 * @param  {Object} gameEnvironment
 * @return {Array}                  e.g. [1,4]
 */
var nextPos = (currentPos, direction, gameEnvironment) => {
  var newPos = [currentPos[0], currentPos[1]]
  if (direction === DIRECTIONS[0]) {
    newPos = [newPos[0], Math.max(newPos[1] - 1, 0)]
  } else if (direction === DIRECTIONS[1]) {
    newPos = [Math.min(newPos[0] + 1, gameEnvironment.gridSize), newPos[1]]
  } else if (direction === DIRECTIONS[2]) {
    newPos = [newPos[0], Math.min(newPos[1] + 1, gameEnvironment.gridSize)]
  } else if (direction === DIRECTIONS[3]) {
    newPos = [Math.max(newPos[0] - 1, 0), newPos[1]]
  }
  return newPos
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
