Your exercise will be to create a console version of the classic game of Connect4.  The classic board consists of 6 columns with 7 rows high.  At the start of a new game, the board is empty.  If you have never played Connect4, there are plenty of explanations out on the Internet.

#### Objective

Be the first player to get four of your colored checkers in a row - horizontally, vertically, or diagonally.

#### How to play

1.  Red or yellow player starts.  Players will alternate turns after playing a checker.  Each player will be prompted that it is his or her turn by "[Red]/[Yellow], please enter the column to drop your checker:".
2.  On your turn, you specify which column to drop your checker when prompted. The checker will "fall" to the lowest point in that column.
3.  Following a players move, there will either be a prompt for the next player's move, or the application will output "[Red]/[Yellow] wins!" if there is a winner.  
4.  After there is a winner, the game will prompt, "Do you want to play again?".   The loser of the previous game will the first player of the next game if the players choose to play again.  Otherwise, the program exits if the players do not want to play again.

#### Expectations

-   The game will be started by running the executable in a console. 
-   If the user gives improper input, feedback is given to the user to try again.

#### Stretch Goals (if you feel like you want to do more)

-   Unit tested code
-   Accept command line arguments to customize the game in some manner when it is started.
-   Output a visual representation of the board's status to the console after each turn.
-   Use your own creativeness to impress us.