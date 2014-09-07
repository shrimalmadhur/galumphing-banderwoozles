;(function() {
	var Board = {
		boardColors : [],
		rows : 0,
		cols : 0
	}

	$(document).ready(function() {
		jQuery('#submit').unbind('click').click(function(e){
			e.preventDefault();
			var rows = jQuery('input#rows').val();
			var cols = jQuery('input#cols').val();
			Board.rows = rows;
			Board.cols = cols;
			var container = jQuery("div#tile-wrapper");
			makeGame(container, rows, cols);
			jQuery('div.tile').on('click' ,function (){
				var clickedTile = jQuery(this);
				if(clickedTile.hasClass('green')){
					var clickedRowNum = clickedTile.parent().index();
					var clickedColNum = clickedTile.index();
					if(clickedRowNum - 1 >= 0){
						changeCol(clickedRowNum -1, clickedColNum);
					}
					if(clickedColNum - 1 >= 0){
						changeCol(clickedRowNum, clickedColNum - 1);
					}
					if(clickedRowNum + 1 < Board.rows){
						changeCol(clickedRowNum + 1, clickedColNum);
					}
					if(clickedColNum + 1 < Board.cols){
						changeCol(clickedRowNum, clickedColNum + 1);
					}
					setColor(clickedRowNum, clickedColNum, 'red');
					updateCounter("green", "red");
					if(jQuery("h1.green").text() == 0){
						if(jQuery("h1.red").text() != Board.rows*Board.cols){
							alert("Yo Know Nufin Jon Snow! Now Press OK to restart!"); 
							location.reload();
						}else{
							alert("Good Job Kid!");
						}
					}
				}
			});
		});
	});

	var changeCol = function (row, col){
		if(Board.boardColors[row][col] == 'green'){
			setColor(row, col, 'blue');
			updateCounter("green", "blue");
		}else if(Board.boardColors[row][col] == 'blue'){
			setColor(row, col, 'green');
			updateCounter("blue", "green");
		}
	}

	var updateCounter = function (removeColor, addColor){
		jQuery('h1.' + removeColor).text(Number(jQuery('h1.' + removeColor).text()) - 1);
		jQuery('h1.' + addColor).text(Number(jQuery('h1.' + addColor).text()) + 1);
	}
	var setColor = function (row, col, color){
		var currTile = getTile(row, col);
		currTile.removeClass('red')
			.removeClass('blue')
			.removeClass('green')
			.addClass(color);

		Board.boardColors[row][col] = color;
		//console.log(Board.boardColors);

	} 

	var getTile = function (row , col){
		return jQuery('.tile-row:nth(' + row + ') > .tile:nth('
			 + col + ')');
	}
	var makeGame = function (container, rows, cols){
		jQuery('form#args').detach();
		var isValid = rows > 0 && cols > 0;
		jQuery('h1.green').text(isValid ? 1 : 0);
		jQuery('h1.blue').text(isValid ? rows*cols - 1 : 0);
		//$curTileRow = jQuery("<div class='tile-row'></div>");
		//$eachTile = jQuery("<div class='tile'></div>");
		
		for(var curRow = 0; curRow < rows; curRow++){
			Board.boardColors[curRow] = [];
			container.append("<div class='tile-row'></div>");
			for(var curCol = 0; curCol < cols; curCol++){
				console.log(curCol);
				container.find('div.tile-row:nth(' + curRow + ')').append("<div class='tile'></div>");
				setColor(curRow, curCol, 'blue');
			}
		}
		setColor(0,0,'green')
	};
})();