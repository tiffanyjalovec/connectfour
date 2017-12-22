var config = {
	redPlayer: {color: "red", position: 1, name: "Red"},
	yellowPlayer: {color: "yellow", position: 2, name: "Yellow"},
	countToWin: 4,
	gameOver: false,
};

var board = [
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0]
];

var currentPlayer = config.redPlayer;
document.getElementById("msg").innerHTML = currentPlayer.name+", please click on the column to drop your checker:";
document.getElementById("play-again").style.display = "none";
function buildRack() {
	var body = document.getElementsByTagName('body')[0];

	// Create table
	var table = document.createElement('table');
	table.setAttribute("id", "board");
	var tableBody = document.createElement('tbody');

	var rows = 6; 
	var columns = 7;
	for(var i=0; i< rows; i++){
		var row = document.createElement('tr');

		for(var j=0; j< columns; j++){
			var cell = document.createElement('td');
			var checker = document.createElement('div');
			checker.setAttribute("class", ""+i+"-"+j+" empty");
			checker.addEventListener("click", function (checker) {
				var checkerClass = checker.target.classList[0];
				addDiscToBoard(checkerClass);
			});
			cell.appendChild(checker);
			row.appendChild(cell);
		}

		tableBody.appendChild(row);
	}
	table.appendChild(tableBody);
	body.appendChild(table);
}
buildRack();

// Controllers
function addDiscToBoard(position) {
	if(config.gameOver == false){
		var test = position.split("-"),
		    y_pos = test[0],
		    x_pos = test[1],
		    changed = false;
		for(i=0; i< board.length; i++ ){
			if(board[i][x_pos] != 0 && changed == false){
				changed = true;
				board[i-1][x_pos] = currentPlayer.position;
				var lastPosition = i - 1;
				var positionClass = ""+lastPosition+"-"+x_pos;
				var block = document.getElementsByClassName(positionClass)[0].classList;
				block.add(""+currentPlayer.color+"-checker");
			}
			if(i == 5 && board[i][x_pos] == 0){
				board[i][x_pos] = currentPlayer.position;
				var positionClass = ""+i+"-"+x_pos;
				var block = document.getElementsByClassName(positionClass)[0].classList;
				block.add(""+currentPlayer.color+"-checker");
			}
		}
		if(horizontalWin() == true || verticalWin() == true || diagonalWin() == true || gameIsDraw() == true ){
			if(gameIsDraw() == true ){
				document.getElementById("msg").innerHTML = "It's a draw!";
			} else {
				document.getElementById("msg").innerHTML = currentPlayer.name + " wins!";
				document.getElementById("play-again").style.display = "block"
				config.gameOver = true;
			}
		} else {
			changePlayer(); 
		}
	}
};

function changePlayer() {
	if (currentPlayer.color === 'red') {
		currentPlayer = config.yellowPlayer;
	} else {
		currentPlayer = config.redPlayer;
	}
	document.getElementById("msg").innerHTML = currentPlayer.name+", please click on the column to drop your checker:";
};

function gameIsDraw() {
	for (var y = 0; y <= 5; y++) {
		for (var x = 0; x <= 6; x++) {
			if (board[y][x] === 0) {
				return false;
			}
		}
	}
	return true;
};

function horizontalWin() {
	var currentPosition = null,
			lastPosition = 0,
			tally = 0;
	for (var y = 0; y <= 5; y++) {
		for (var x = 0; x <= 6; x++) {
			currentPosition = board[y][x];
			if (currentPosition === lastPosition && currentPosition !== 0) {
				tally += 1;
			} else {
				tally = 0;
			}
			if (tally === config.countToWin - 1) {
				return true;
			}
			lastPosition = currentPosition;
		}
		tally = 0;
		lastPosition = 0;
	}
	return false;
};

function verticalWin() {
	var currentPosition = null,
			lastPosition = 0,
			tally = 0;
	for (var x = 0; x <= 6; x++) {
		for (var y = 0; y <= 5; y++) {
			currentPosition = board[y][x];
			if (currentPosition === lastPosition && currentPosition !== 0) {
				tally += 1;
			} else {
				tally = 0;
			}
			if (tally === config.countToWin - 1) {
				return true;
			}
			lastPosition = currentPosition;
		}
		tally = 0;
		lastPosition = 0;
	}
	return false;
};

function diagonalWin() {
	var x = null,
			y = null,
			xtemp = null,
			ytemp = null,
			currentPosition = null,
			lastPosition = 0,
			tally = 0;

	for (x = 0; x <= 6; x++) {
		xtemp = x;
		ytemp = 0;

		while (xtemp <= 6 && ytemp <= 5) {
			currentPosition = board[ytemp][xtemp];
			if (currentPosition === lastPosition && currentPosition !== 0) {
				tally += 1;
			} else {
				tally = 0;
			}
			if (tally === config.countToWin - 1) {
				return true;
			}
			lastPosition = currentPosition;
			xtemp++;
			ytemp++;
		}
		tally = 0;
		lastPosition = 0;
	}

	for (x = 0; x <= 6; x++) {
		xtemp = x;
		ytemp = 0;

		while (0 <= xtemp && ytemp <= 5) {
			currentPosition = board[ytemp][xtemp];
			if (currentPosition === lastPosition && currentPosition !== 0) {
				tally += 1;
			} else {
				tally = 0;
			}
			if (tally === config.countToWin - 1) {
				return true;
			}
			lastPosition = currentPosition;
			xtemp--;
			ytemp++;
		}
		tally = 0;
		lastPosition = 0;
	}

	for (y = 0; y <= 5; y++) {
		xtemp = 0;
		ytemp = y;

		while (xtemp <= 6 && ytemp <= 5) {
			currentPosition = board[ytemp][xtemp];
			if (currentPosition === lastPosition && currentPosition !== 0) {
				tally += 1;
			} else {
				tally = 0;
			}
			if (tally === config.countToWin - 1) {
				return true;
			}
			lastPosition = currentPosition;
			xtemp++;
			ytemp++;
		}
		tally = 0;
		lastPosition = 0;
	}

	for (y = 0; y <= 5; y++) {
		xtemp = 6;
		ytemp = y;

		while (0 <= xtemp && ytemp <= 5) {
			currentPosition = board[ytemp][xtemp];
			if (currentPosition === lastPosition && currentPosition !== 0) {
				tally += 1;
			} else {
				tally = 0;
			}
			if (tally === config.countToWin - 1) {
				return true;
			}
			lastPosition = currentPosition;
			xtemp--;
			ytemp++;
		}
		tally = 0;
		lastPosition = 0;
	}
  return false;
};

function resetGame(){
	console.log("resetGame fired")
	var dynaTable = document.getElementById("board");
	dynaTable.parentNode.removeChild(dynaTable); 
	buildRack();
	config.gameOver = false;
	document.getElementById("play-again").style.display = "none";
	board = [
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0]
	];
	changePlayer(); 
};


