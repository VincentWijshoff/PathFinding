# Pathfinding algorithms
This is a visualisation tool for some off the better known pathfinding algorithms.
## Algorithms
### Breadth first
This algorithm searches each inactive neighbour node in each itteration. This will generate the shortest path.
### Depth first
Depth first searches one branch as far as possible until there is no further possible search. This will not generate the shortest path to the end node.
### Dijkstra
Dijkstra is simmilar to Breadth first, insteas of searching every neighbour of every node, it will search the first node in the queue and ads its neighbours to the back off this queue. This algorithm produces the shortest path.
### A-star
This algorithm works with heuristic values and searches the shortest path using this heuristic value. I implemented a possibility to add negative weights (See features), if any negative weights are added, the guarantee for the shortest path can not be upheld. Otherwise the shortest path will always be generated.
### ID A-star
ID A-star or itterative deepening A-star is similar to the regular A-star algorithm with the key difference that ID A-star uses a more depth first approach. ID A-star will explore a single branch using the heuristic values to choose the next node with each itteration. This algorithm does not produce the shortest path. Because of the heuristic propperties of this algorithm, the negative weigths can also be used with this algorithm.
## Features
There are some key features to make the use of this tool much more enjoyable and easy to use.
### algorithm picker
This dropdown styled box can be used to choose the algortihm you want to use. If no algorithm was chosen, an alert will be thrown.
### Speed
There are 4 speeds at which the algorithms will be itterated through. The speed is defaulted to normal.
### Reset
At loading off the page or on pressing the reset button, the grid will rid off all walls that are previously drawn on the grid. The start and end positions are chosen at random.
### run algorithm
Pressing this button will start the chosen algorithm.
### Set start position
If you press this button the next box you click in will be the new start position.
### Set end position
This does the same as the Set start position button, but with the end position.
### Add negative weight
This will add a negative weight to the grid on the next position you click on. This weight will only do something if a heuristic algorithm was chosen.
## Interactivenes
The fun part about this tool is that it is interactive with the user. You can draw walls on the provided grid which will be taken into account for while the algorithm is running. This makes for a lot off possibilitys and fun mazes or paths you can create for the algorith to go through.