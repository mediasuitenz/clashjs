var utils = require('../lib/utils.js');

var cowardBot = {
  info: {
    name: 'cowardBot',
    style: 2
  },
  ai: (playerState, enemiesState, gameEnvironment) => {
  	//get direction enemies can fire
  	//9directional test, util?
  	////get out of the way
  }
};

function test9dir(playerState, enemyStates) {
//urld
//nesw
}

function canEnemySeeSquare(x, y, enemyState) {
	if (x === enemyState.position[0]) {
		if (enemyState.direction === 'north' && y < enemyState.position[1])
			return true
		if (enemyState.direction === 'south' && y > enemyState.position[1])
			return true
	}
	else if (y === enemyState.position[1]) {
		if (enemyState.direction === 'west' && x < enemyState.position[0])
			return true
		if (enemyState.direction === 'east' && x > enemyState.position[0])
			return true
	}
	return false
}

module.exports = cowardBot;
