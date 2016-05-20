/**
 * Created by hallj on 5/3/2016.
 */

//Global variables

var dimension = 3;  // dimensions of game board (ex. 3x3)
var first_players_turn=true;  // boolean for current players turn
var div_dimensions = (50 / dimension) + "vw";
var text_size = (20 / dimension) + "vw";
var number_of_tiles_to_add = 7;  // this increases by 2 each time game size is increased

var x_array=[], o_array=[];  // holds the tiles (divs) that are clicked - currently not specifically necessary
var x_numbered_array=[], o_numbered_array=[];  // array of tile ids as nums

var current_tile_x, current_tile_o;  // current "tile" as represented by it's tile id
var win_condition;  // # of tiles to match for win

//DOC READY/CLICK HANDLERS
$(document).ready(function() {

    // Call a restore
    $('.restore').on('click', restore_me );

    // Reset button
    $('.reset').on('click', reset_board );

    // Adds tiles and increases dimensions of board
    $('.plus').on('click', board_maker_plus );

    //gives the css to the tiles and assigns them game functionality and save
    $('.tile').css({
        "width": div_dimensions,
        "height": div_dimensions,
        "font-size": text_size
    }).on('click', function () { // ----- PRIMARY CLICK FUNCTION - should use event delegation here, among other places
        core_game(this);
    });
});


// Function for core game mechanics such as tile clicked and turn switching
function core_game(clicked_el) {

    if($(clicked_el).html()=='') {  // If current tile is empty

        // for player 1 - the Xs
        if (first_players_turn == true) {
            // place_marker($(this),'X');
            $(clicked_el).html('X').css({"color":"limegreen", "text-shadow":"0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"});
            x_array.push($(clicked_el));
            x_numbered_array.push(parseFloat($(clicked_el).attr('id')));
            current_tile_x = x_numbered_array[x_numbered_array.length -1];
            console.log("numbered x_array: ",x_numbered_array);
            win();

            // Switch to Player 2s Turn - the Os
            $('.turn_indicator').html('Player: 2');
            first_players_turn = false;
            console.log('is now Player 2s turn');
            $('body').css({"color":"crimson", "text-shadow":"0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"});

        }
        else{  // if it's player 2s turn - the Os
            $(clicked_el).html('O').css({'color':"crimson", "text-shadow":"0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"});
            o_array.push($(clicked_el));
            o_numbered_array.push(parseFloat($(clicked_el).attr('id')));
            current_tile_o = o_numbered_array[o_numbered_array.length -1];
            console.log("numbered o_array: ",o_numbered_array);
            win();

            // Switch to Player 1s Turn - the Xs
            $('.turn_indicator').html('Player: 1');
            first_players_turn=true;
            console.log('is now Player 1s turn');
            $('body').css({"color":"limegreen", "text-shadow":"0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"});
        }
        saving_local();
    }
}

//Function to store locally with JSON
function saving_local () {
    var jsonObject = {'gameArea': $('.game_area').html()};
    var local_object = JSON.stringify(jsonObject);
    localStorage.setItem('storedGameArea', local_object);
    console.log('This is the JSON: ' , jsonObject);
}

//Function to restore
function restore_me () {
    var restored_object = localStorage.getItem('storedGameArea');
    var restored_from_local = JSON.parse(restored_object);
    $('.game_area').html(restored_from_local.gameArea);
    $('.tile').on('click', function() {
        core_game(this);
    });
    console.log('this is restored object', restored_object);
}

//Function that Resets the gameboard
function reset_board(){

}

//Function to switch boards - dynamically increases gameboard size
function board_maker_plus() {
    console.log('board marker plus was called');

    if(first_players_turn==true){
        $('.turn_indicator').html('Player: 2');
        first_players_turn=false;
        $('body').css({"color":"crimson", "text-shadow":"0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"});
    }
    else {
        $('#how_many_to_win').text('Tiles to Win: 5')
    }

    var tile_id = (dimension * dimension) + 1;
    ++dimension;
    div_dimensions = (50 / dimension) + "vw";
    text_size = (20 / dimension) + "vw";

    for (var i = 1; i <= number_of_tiles_to_add; i++) {
        var new_tile = $('<div>').addClass('tile').attr('id', tile_id).css({"width": div_dimensions, "height": div_dimensions, "font-size":text_size});
        $('.game_area').append(new_tile);
        tile_id++;
    }

    number_of_tiles_to_add += 2;
    $('.tile').css({"width": div_dimensions, "height": div_dimensions, "font-size":text_size}).on('click', function() {
        core_game(this);
    });
}

//Function for win conditions
function set_win_condition (){
    if (dimension <= 4){
        win_condition = 3;
    } else if (dimension >= 5 && dimension <= 10){
        win_condition = 4;
    } else if (dimension > 10){
        win_condition = 5;
    }
}

// WINNING! - triggered when either player clicks an open tile, checks for a win for that player
function win () {
    set_win_condition();
    var current_tile, numbered_array, current_player;
    console.log("win fxn triggered.  Matches needed to win: " + win_condition);

    if (first_players_turn == true) {  // sets core local variables based on turn of current player
        current_tile = current_tile_x;
        numbered_array = x_numbered_array;
        current_player = "Player 1 (X)"
    } else {
        current_tile = current_tile_o;
        numbered_array = o_numbered_array;
        current_player = "Player 2 (O)"
    }
    console.log("current player is " + current_player + " and current tile is " + current_tile);

    // In a 5 x 5 (any size works) grid, we'll use "12" as example
    var vertical_position = Math.ceil(current_tile / dimension);  //  12 / 5 = 2.4 | .ceil(2.4) = 3 | Vertical position from top
    var horizontal_position = current_tile - ((vertical_position - 1) * dimension);  //  12 - ( (3-1) * 5) | 12 - 10 = 2 | Horizontal pos from left
    var left_limit = horizontal_position - 1;
    var right_limit = dimension - horizontal_position;
    var up_limit = vertical_position -1;
    var down_limit = dimension - vertical_position;
    console.log("positions and limits fo current tile (vert, horiz, left, right, up, down): " + vertical_position + " "
        + horizontal_position + " " + left_limit + " " + right_limit + " " + up_limit + " " + down_limit);


    function horizontal_win() {  // checks if consecutive horizontal matches equal win condition

        var horizontal_win_counter = 1;  // total horizontal matches
        var left_match = 1;
        var right_match = 1;

        for (var i = 1; i <= 4 && i <= left_limit; i++) {  // check left for matches - the i<= 4 condition is because win_condition = 5 is max

            for (var z = 0; z < numbered_array.length - 1; z++) {  // loops through entire array of tiles
                if (i == current_tile - numbered_array[z]) {  // recognize a match for an adjacent tile to the left
                    left_match++;
                    horizontal_win_counter++;
                    break; // exits z loop if win counter increases (for efficiency)
                }
            }
            if (left_match <= i) {
                break;
            } // stop checking left for matches if no tiles matched the next adjacent tile
        }

        for (var x = 1; x <= 4 && x <= right_limit; x++) {  // check right for matches - identical mirror to "left" code above

            for (var y = 0; y < numbered_array.length - 1; y++) {
                if (x == numbered_array[y] - current_tile) {
                    right_match++;
                    horizontal_win_counter++;
                    break;
                }
            }
            if (right_match <= x) {
                break;
            }
        }
        console.log(" horizontal win counter ended @", horizontal_win_counter);
        return horizontal_win_counter;
    }

    if (horizontal_win() >= win_condition) {
        alert(current_player + " just won!")
    }


    function vertical_win() {  // checks if consecutive vertical matches equal win condition - code mirrors horizontal win above except math diffs

        var vertical_win_counter = 1;
        var up_match = 1;
        var down_match = 1;

        for (var i = 1; i <= 4 && i <= up_limit; i++) {

            for (var z = 0; z < numbered_array.length - 1; z++) {
                if (i == current_tile - (numbered_array[z] + ((dimension -1) * i) )) {
                    up_match++;
                    vertical_win_counter++;
                    break;
                }
            }
            if (up_match <= i) {
                break;
            }
        }

        for (var x = 1; x <= 4 && x <= down_limit; x++) {

            for (var y = 0; y < numbered_array.length - 1; y++) {
                if (x == (numbered_array[y] - ((dimension -1) * x) - current_tile )) {
                    down_match++;
                    vertical_win_counter++;
                    break;
                }
            }
            if (down_match <= x) {
                break;
            }
        }
        console.log("vertical win counter ended @", vertical_win_counter);
        return vertical_win_counter;
    }

    if (vertical_win() >= win_condition) {
        alert(current_player + " just won!")
    }


    function diagonal_backslash() {  // mirrors above logic - checks for "backslash" diagonal

        var diag_backslash_win_counter = 1;
        var diag_left_up_match = 1;
        var diag_right_down_match = 1;

        for (var i = 1; i <= 4 && i <= left_limit && i<= up_limit; i++) {  // 3rd param needed to restrict matches outside both horiz and vert limits

            for (var z = 0; z < numbered_array.length - 1; z++) {
                if (current_tile == numbered_array[z] + (i * dimension) + i) {
                    diag_left_up_match++;
                    diag_backslash_win_counter++;
                    break;
                }
            }
            if (diag_left_up_match <= i) {
                break;
            }
        }

        for (var x = 1; x <= 4 && x <= right_limit && x <= down_limit; x++) {

            for (var y = 0; y < numbered_array.length - 1; y++) {
                if (current_tile == numbered_array[y] - (x * dimension) - x) {
                    diag_right_down_match++;
                    diag_backslash_win_counter++;
                    break;
                }
            }
            if (diag_right_down_match <= x) {
                break;
            }
        }
        console.log("diagonal backslash win counter ended @", diag_backslash_win_counter);
        return diag_backslash_win_counter;
    }

    if (diagonal_backslash() >= win_condition) {
        alert(current_player + " just won!")
    }


    function diagonal_forwardslash() {  // mirrors above logic - checks for "backslash" diagonal

        var diag_forwardslash_win_counter = 1;
        var diag_left_down_match = 1;
        var diag_right_up_match = 1;

        for (var i = 1; i <= 4 && i <= left_limit && i<= down_limit; i++) {  // 3rd param needed to restrict matches outside both horiz and vert limits

            for (var z = 0; z < numbered_array.length - 1; z++) {
                if (current_tile == numbered_array[z] - (i * dimension) + i) {
                    diag_left_down_match++;
                    diag_forwardslash_win_counter++;
                    break;
                }
            }
            if (diag_left_down_match <= i) {
                break;
            }
        }

        for (var x = 1; x <= 4 && x <= right_limit && x <= up_limit; x++) {

            for (var y = 0; y < numbered_array.length - 1; y++) {
                if (current_tile == numbered_array[y] + (x * dimension) - x) {
                    diag_right_up_match++;
                    diag_forwardslash_win_counter++;
                    break;
                }
            }
            if (diag_right_up_match <= x) {
                break;
            }
        }
        console.log("diagonal backslash win counter ended @", diag_forwardslash_win_counter);
        return diag_forwardslash_win_counter;
    }

    if (diagonal_forwardslash() >= win_condition) {
        alert(current_player + " just won!")
    }

}


//Function to display stats
// function stats() {
//player 1 wins

//     $('p1win').html(++);
// //player 2 wins
//     $('p2win').html(++);
//
// }



