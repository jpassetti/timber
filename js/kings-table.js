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
		$(row).addClass("row");

		for (var x = 0; x < tokenArrangement[i].length; x++) {
			var tileValue = tokenArrangement[i][x];
			var tile = $("<div />");
				$(tile).addClass("tile");
			var token = $("<div />");
				$(token).addClass("token");
			
			if (tileValue === 1) {
				$(token).addClass("dark")
			} else if (tileValue === 2) {
				$(token).addClass("light");
			} else if (tileValue === 3) {
				$(token).addClass("king");
			} else if (tileValue === 9) {
				$(tile).addClass("corner");
			}
			if (tileValue > 0 && tileValue <= 3) {
				$(token).appendTo(tile);
			}
			$(tile).appendTo(row);
		} // inner for loop
		$(row).appendTo("#game");
	} // outer for loop

}); // ready