
var utils = require('../lib/utils.js');

var prettyClose = function(originValue, targetValue) {
  return (originValue === targetValue
    || originValue === (targetValue + 1)
    || originValue === (targetValue - 1));
}

var dangerMoment = function(originOrientation, origin, target) {
  var originX = origin[0];
  var originY = origin[1];

  var targetX = target.position[0];
  var targetY = target.position[1];

  var west = (originOrientation === "west" && ((targetX + 1) > originX && prettyClose(originY, targetY)));
  var north = (originOrientation === "north" && ((targetY + 1) < originY && prettyClose(originX, targetX)));
  var south = (originOrientation === "south" && ((targetY + 1) > originY && prettyClose(originY, targetY)));
  var east = (originOrientation === "east" && ((targetX + 1) > originX && prettyClose(originY, targetY)));

  return (west || north || south || east);
};


var shouldShoot = function(player, enemyList) {
  var should = false;

  enemyList.forEach(function(item) {
    if (should === false ) {
      should = dangerMoment(player.direction, player.position, item);
    }
  });

  return should;
};

var ammoTarget = undefined;
var closeAmmo = function(player, ammoPositions) {

  if (ammoTarget === undefined) {
    ammoTarget = ammoPositions.reverse()[0]
  }

  var contains = false;
  ammoPositions.forEach(function(item){
    if (item[0] === ammoTarget[0] && item[1] === ammoTarget[1]) {
      contains = true;
    }
  });

  if (contains === false) {
    ammoTarget = ammoPositions.reverse()[0];
  }

  var directionToAmmo = utils.getDirection(
    player.position,
    ammoTarget
  );

  if (directionToAmmo !== player.direction) {
    return directionToAmmo;
  }
  return 'move';
};

var turtleBot = {
  info: {
    name: 'Turtle',
    style: 4
  },
  ai: (playerState, enemyState, gameEnvironment) => {
    var ammo = playerState.ammo;

    //- check if we can shoot
    if (ammo > 0 && shouldShoot(playerState, enemyState, false)) {
      return "shoot";
    }

    //- move to ammo if it's close
    // if (ammo === 0) {
    if (gameEnvironment.ammoPosition.constructor === Array && gameEnvironment.ammoPosition.length > 1 && ammo < 3) {
      return closeAmmo(playerState, gameEnvironment.ammoPosition);
    }

    // }
    // if (shouldShoot(playerState, enemyState, true)) {
    //   return utils.randomMove();
    // }
  }
};

module.exports = turtleBot;

