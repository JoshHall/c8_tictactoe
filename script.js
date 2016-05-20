/**
 * Created by hallj on 5/3/2016.
 */
//Global variables
var dimension = 3;
var first_players_turn=true;
var div_dimensions = (30 / dimension) + "vw";
var text_size = (15 / dimension) + "vw";
var number_of_tiles_to_add = 7;
// working on cloning the original game_area to use with reset
// var clone;
var x_array=[];
var o_array=[];
var x_numbered_array=[];
var o_numbered_array=[];
var x_index=0;
var o_index=0;
// var win_condition;
//
// var current_tile_x = x_numbered_array[x_numbered_array.length -1];  // current "tile" as represented by it's ordered #
// var current_tile_o = o_numbered_array[o_numbered_array.length -1];

//DOC READY/CLICK HANDLERS
$(document).ready(function(){
// Call a restore
    $('.restore').on('click', restore_me);
 // making the game area a clone at start
 //     clone = $('.game_area').clone(true);
 //Reset button
    $('.reset').on('click', reset_board);

 //gives the css to the tiles
    $('.tile').css({"width": div_dimensions, "height": div_dimensions, "font-size":text_size}).on('click', playerTurn; saving_local; tilesToWin);
// click handler for local storage
    $('.tile').on('click',saving_local);
});

//Function to store locally with JSON
function saving_local () {
    var jsonObject = {'localDiv': []};
    var localTiles = $('div');
    for (var i = 0; i < localTiles.length; i++) {
        jsonObject.localDiv[i] = localTiles[i].outerHTML;
    }
    var local_array = JSON.stringify(jsonObject);
    localStorage.setItem('storedArray' , local_array);
}

//Function to restore
function restore_me () {
    var restored_string_array = localStorage.getItem('storedArray');
    var restored_from_local = JSON.parse(restored_string_array);
    $('.tile').css({"width": div_dimensions, "height": div_dimensions, "font-size": text_size}).on('click', playerTurn);
    $('.tile').html(restored_from_local.localDiv);

}

//Function that Resets the gameboard
    function reset_board() {
    //resets gameboard but keeps all stats and wins
    // $('.game_area').clone().append(clone);
    }

function tilesToWin() {
    if (dimension <= 4){
        $('#how_many_to_win').text('Tiles to Win: 3')
    }
    else if (dimension > 4 && dimension <= 10) {
        $('#how_many_to_win').text('Tiles to Win: 4')
    }
    else {
        $('#how_many_to_win').text('Tiles to Win: 5')
    }
}
//Function to switch boards: called in the html
    function board_maker_plus() {
    //This will be the function that dynamically increases the gameboard size
        ++dimension;
        if (first_players_turn == true) {
            $('.turn_indicator').html('Player: 2');
            first_players_turn = false;
            $('body').css({"color": "crimson", "text-shadow": "0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"});
        }
        else {
            $('.turn_indicator').html('Player: 1');
            first_players_turn = true;
            $('body').css({
                "color": "limegreen",
                "text-shadow": "0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"
            });
        }
        var tile_id = 10;
        div_dimensions = (30 / dimension) + "vw";
        text_size = (15 / dimension) + "vw";
        for (var i = 1; i <= number_of_tiles_to_add; i++) {
            var new_tile = $('<div>').addClass('tile').attr('id', tile_id).css({
                "width": div_dimensions,
                "height": div_dimensions,
                "font-size": text_size
            });
            $('.game_area').append(new_tile);
            tile_id++;
        }
        number_of_tiles_to_add += 2;
        $('.tile').css({
            "width": div_dimensions,
            "height": div_dimensions,
            "font-size": text_size
        }).on('click', function (){})
        playerTurn();
        saving_local();
        tilesToWin();
    }

//function for tile placement
    function playerTurn() {
        //onclick, if it is first player's turn, place an x and change player turn, send
        // the clicked tile's info to arrays. else do the same for player 2 with an o.
        if ($(this).html() == '') {
            if (first_players_turn == true) {
                // place_marker($(this),'X');
                $('.turn_indicator').html('Player: 2');
                $(this).html('X').css({
                    "color": "limegreen",
                    "text-shadow": "0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"
                });
                first_players_turn = false;
                $('body').css({
                    "color": "crimson",
                    "text-shadow": "0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"
                });
                x_array[x_index] = $(this).attr('id');
                x_numbered_array[x_index] = parseFloat($(this).attr('id'));
                x_index++;
            }
            else {
                $('.turn_indicator').html('Player: 1');
                $(this).html('O').css({
                    'color': "crimson",
                    "text-shadow": "0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"
                });
                first_players_turn = true;
                $('body').css({
                    "color": "limegreen",
                    "text-shadow": "0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"
                });
                o_array[o_index] = $(this).attr('id');
                o_numbered_array[o_index] = parseFloat($(this).attr('id'));
                o_index++;
            }
        }
    }



//
// //Function for win conditions
// function set_win_condition (){
//     if (dimension <= 4){
//         win_condition = 3;
//     } else if (dimension >= 5 && dimension <= 10){  // unsure if "evaluators" for dimensions >= 5 in right order
//         win_condition = 4;
//     } else if (dimension > 10){
//         win_condition = 5;
//     }
// }
//
// // In a 5 x 5 (any size works) grid, we'll use "12" as example
// var horizontal_position_x = (current_tile_x % dimension) * dimension;  //  12 % 5 = .4 | .4 * 5 = 2 | 2 is horizontal position (from left edge)
// var horizontal_position_o = (current_tile_o % dimension) * dimension;
//
// var vertical_position_x = Math.ceil(current_tile_x / dimension);  //  12 / 5 = 2.4 | .ceil(2.4) = 3 | Vertical position from top
// var vertical_position_o = Math.ceil(current_tile_o / dimension);
//
// var left_limit_x = horizontal_position_x - 1;
//
// var right_limit_x = dimension - horizontal_position_x;
//
// var left_limit_o = horizontal_position_o - 1;
//
// var right_limit_o = dimension - horizontal_position_o;
//
//
// // horizontal validation - evaluation order of ops - (left, down) , (right, up)
//
// function horizontal_win (){
//
//     var horizontal_win_counter = 1;
//
//     for (i=1; i<=4 && i<=left_limit; i++){  // the i<= 4 condition is because win_condition = 5 is max
//
//         var distance_validation;
//
//         adjacent_tiles();
//
//         if (i == distance_validation){
//             horizontal_win_counter++;
//             console.log("adjacent tiles add to win counter working:", horizontal_win_counter);
//         }
//     }
// }
//
// function adjacent_tiles (){  // this is acting as our .this() or .forEach array method
//     for (z=0; z <= test_array.length -1; z++){
//         distance_validation = current_tile - test_array[z];
//         console.log("distance validation equals ", distance_validation);
//     }
// }
//
//

//Function to display stats
// function stats() {
//player 1 wins

//     $('p1win').html(++);
// //player 2 wins
//     $('p2win').html(++);
//
// }



