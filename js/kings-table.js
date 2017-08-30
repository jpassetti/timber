$(document).ready(function() {
	var gameBoard = {
		rows: 11,
		columns: 11
	} // gameBoard

	var tokenArrangement = [
		[9,0,0,1,1,1,1,1,0,0,9],
		[0,0,0,0,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,2,0,0,0,0,1],
		[1,0,0,0,2,2,2,0,0,0,1],
		[1,1,0,2,2,3,2,2,0,1,1],
		[1,0,0,0,2,2,2,0,0,0,1],
		[1,0,0,0,0,2,0,0,0,0,1],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,0,0,0,0],
		[9,0,0,1,1,1,1,1,0,0,9]
	]; // tokenArrangement

	for (var i = 0; i < tokenArrangement.length; i++) {
		var row = $("<div />");
		$(row).addClass("tile__row");

		for (var x = 0; x < tokenArrangement[i].length; x++) {
			var tileValue = tokenArrangement[i][x];
			var tile = $("<div />");
				$(tile).addClass("tile__item");
			var token = $("<div />");
				$(token).addClass("token__item");
			
			if (tileValue === 1) {
				$(token).addClass("token__item--dark")
			} else if (tileValue === 2) {
				$(token).addClass("token__item--light");
			} else if (tileValue === 3) {
				$(token).addClass("token__item--king");
			} else if (tileValue === 9) {
				$(tile).addClass("tile__item--corner");
			}
			if (tileValue > 0 && tileValue <= 3) {
				$(token).appendTo(tile);
			}
			$(tile).appendTo(row);
		} // inner for loop
		$(row).appendTo("#game");
	} // outer for loop

	var playerTurn = "dark";

	$(".player-col:first-child").addClass("player-turn");

	function scanTokenArrangement(rowIndex, tokenIndex) {
		// scan up, scan right, scan down, scan left
		//console.log("rowIndex:" + rowIndex);
		//console.log("tokenIndex:" + tokenIndex);

		// -1. reset tiles
		$(".tile__item").removeClass("tile__move--possible");

		// 1. build blank array holding zeros
		var movesArray = [];
		for (var i = 0; i < gameBoard.rows; i++) {
			var movesRow = [];
			for (var x = 0; x < gameBoard.columns; x++) {
				movesRow.push(0);
			}
			movesArray.push(movesRow);
		} // buildRows loop
		
		// 2. scan up on the tokenArrangement 
		// start at the current row, and go up towards zero
		for (var i = rowIndex-1; i >= 0; i-- ) {
				if (tokenArrangement[i][tokenIndex] > 0) {
					break;
				} else {
					// 5 is a number to indicate that the piece could move to this tile
					movesArray[i][tokenIndex] = 5;

				}
		}  // for loop -- scan up

		// 3. scan right on the tokenArrangement 
		// start at the current row, and go right, positive
		for (var i = tokenIndex+1; i < tokenArrangement[rowIndex].length; i++ ) {
				if (tokenArrangement[rowIndex][i] > 0) {
					break;
				} else {
					// 5 is a number to indicate that the piece could move to this tile
					movesArray[rowIndex][i] = 5;
				}
		}  // for loop -- scan right

		// 4. scan down on the tokenArrangement 
		// start at the current row, and go down, positive
		for (var i = rowIndex+1; i < tokenArrangement.length; i++ ) {
				if (tokenArrangement[i][tokenIndex] > 0) {
					break;
				} else {
					// 5 is a number to indicate that the piece could move to this tile
					movesArray[i][tokenIndex] = 5;
				}
		}  // for loop -- scan down

		// 5. scan left on the tokenArrangement 
		// start at the current row, and go left, negative
		for (var i = tokenIndex-1; i >= 0; i-- ) {
				if (tokenArrangement[rowIndex][i] > 0) {
					break;
				} else {
					// 5 is a number to indicate that the piece could move to this tile
					movesArray[rowIndex][i] = 5;
				}
		}  // for loop -- scan right

		// moves are now indicated in the movesArray with 5's
		//console.log(movesArray);

		// 6. sync is with the gameboard
		for (var i = 0; i < movesArray.length; i++) {
			for (var x = 0; x < movesArray.length; x++) {
				if (movesArray[i][x] === 5) {
				$(".tile__row:eq(" + i + ")").find(".tile__item:eq(" + x + ")").addClass("tile__move--possible");
				} // endif
			} // inside movesArray loop
		} // movesArray loop
	} //scanTokenArrangement

	//var tileClicked = false;

	$(".token__item").draggable({
		connectToSortable: ".tile__move--possible",
		//revert: 'invalid',
		//scope: "items"
	});
	

	$(".tile__move--possible").droppable({
    accept: ".token__item",
    // scope: "items",
    drop: function(ev, ui) {
        var dropped = ui.draggable;
        var droppedOn = $(this);
        $(droppedOn).droppable("disable");
        $(dropped).parent().droppable("enable");
        $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
      }
    });

	$(".token__item").on("mousedown", function(event){
		event.preventDefault();
			var tokenRowIndex = $(this).parents(".tile__row").index();
			var tokenItemIndex = $(this).parents(".tile__item").index();
			if (playerTurn === "dark" && $(this).hasClass('token__item--dark')) {
				$(this).parents(".tile__item").addClass("tile__item--active");
				//$(this).css({"backgroundColor": "orange"});
				scanTokenArrangement(tokenRowIndex, tokenItemIndex);
			} else if (playerTurn === "light" && $(this).hasClass('token__item--light')) {

			}
	}); // click

	/*$(".token__item").hover(function() {
			var tokenRowIndex = $(this).parents(".tile__row").index();
			var tokenItemIndex = $(this).parents(".tile__item").index();
			if (playerTurn === "dark" && $(this).hasClass('token__item--dark')) {
				$(this).parents(".tile__item").addClass("tile__item--active");
				//$(this).css({"backgroundColor": "orange"});
				scanTokenArrangement(tokenRowIndex, tokenItemIndex);
			} else if (playerTurn === "light" && $(this).hasClass('token__item--light')) {

			}
			
	}, function() {
		
			$(".tile__item").removeClass("tile__move--possible");
		
			//tileClicked = false;
			if (playerTurn === "dark" && $(this).hasClass('token__item--dark')) {
				$(this).parents(".tile__item").removeClass("tile__item--active");
				//$(this).css({"backgroundColor": "orange"});
			} else if (playerTurn === "light" && $(this).hasClass('token__item--light')) {

			}
	}); // hover*/

}); // ready