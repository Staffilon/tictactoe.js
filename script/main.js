const FREE = 0;
const CIRCLE = 1;
const CROSS = 2;

function getNextSymbol(symbol) {
    if (symbol === CIRCLE)
        return CROSS;
    else return CIRCLE;
}

class TicTacToe{
    #size
    #freeSlots
    #winner
    #grid
    #witness

    /**
     * Creates a new grid with the given size.
     *
     * @param size size of the grid.
     */
    constructor(size){
        this.#size = size;
        this.#grid = Array(size).fill(0).map(_ =>Array(size).fill(FREE));
        this.#winner = FREE;
        this.#freeSlots = size*size;
    }

    /**
     * Returns true if the cell at the given position is empty.
     *
     * @param i row index of the cell.
     * @param j column index of the cell.
     * @returns {*|boolean} true if the cell at the given position is empty.
     */
    isEmpty(i,j){
        return this.isValid(i,j) && this.#grid[i][j] === FREE;
    }

    /**
     * Returns true if the given values represent a valid location.
     *
     * @param i row index of the cell.
     * @param j column index of the cell.
     * @returns {boolean} true if the given values represent a valid location.
     */
    isValid(i,j){
        return (0 <= i && i < this.#size) && (0 <= j && j < this.#size);
    }

    /**
     * Adds a circle symbol at the given postiion.
     *
     * @param i row index of the cell.
     * @param j column index of the cell.
     */
    addCircle(i,j){
        this.#addValue(i,j,CIRCLE);
    }

    /**
     * Adds a cross symbol at the given postion.
     *
     * @param i row index of the cell.
     * @param j column index of the cell.
     */
    addCross(i,j){
    this.#addValue(i, j, CROSS);
    }

    /**
     * Private method used to add a value at the given position.
     *
     * @param i row index of the cell.
     * @param j column index of the cell.
     * @param value symbol to add.
     * @returns {boolean} true if the s
     */
    #addValue(i,j,value){
        if(this.isEmpty(i,j)){
            this.#grid[i][j] = value;
            this.#freeSlots--;
            this.#checkWinner(i,j,value);
            return true;
        }
        else return false;
    }

    /**
     *
     * @param i row index of the cell.
     * @param j column index of the cell.
     * @returns {int} the value at the given position.
     */
    getSymbolAt(i,j){
        if(this.isValid(i,j)){
            return this.#grid[i][j];
        }
        return FREE;
    }

    /**
     * Returns the value at the given position represented as an array.
     *
     * @param position position in the grid.
     * @returns {int} the value at the given position.
     */
    #get(position){
        return this.getSymbolAt(position[0], position[1]);
    }

    /**
     * Returns the array containing the coordinates of row i.
     *
     * @param i row index.
     * @returns {[number,number][]} the array containing the coordinates of row i.
     */
    #row(i){
        return Array.from(Array(this.#size).keys()).map(j => [i,j]);
    }

    /**
     * Returns the array containing the coordinates of column j.
     *
     * @param j column index.
     * @returns {[number,number][]} the array containing the coordinates of column j.
     */
    #column(j){
        return Array.from(Array(this.#size).keys()).map(i => [i,j]);
    }

    /**
     * Returns the array containing the coordinates of diagonal one.
     *
     * @returns {[number,number][]} the array conaining the coordinates of diagonal one.
     */
    #diagonalOne(){
        return Array.from(Array(this.#size).keys()).map(i => [i, i]);
    }


    #diagonalTwo(){
        return Array.from(Array(this.#size).keys()).map(i => [i, this.#size - i - 1]);
    }

    /**
     * Returns true if all the elements at the given locations contain the same value v;
     *
     * @param arrayOfPositions an array of locations.
     * @param v an integer.
     * @returns {boolean} true if all the elements at the given locaitons contain the same value v;
     */
    #check(arrayOfPositions, v){
        if(arrayOfPositions.every(p => this.#get(p) === v)){
            this.#winner = v;
            this.#witness = arrayOfPositions;
            return true;
        }
        else return false;
    }

    /**
     * Returns true if all the elements of the row i contain the same value v;
     *
     * @param i a row index.
     * @param v a value.
     * @returns {boolean} true if all the elements of the row i contain the same value v.
     */
    #checkRow(i,v){
        return this.#check(this.#row(i),v);
    }

    /**
     * Returns true if all the elements of the column j contain the same value v;
     *
     * @param j a column index.
     * @param v a value.
     * @returns {boolean} true if all the elements of the column j contain the same value v.
     */
    #checkColumn(j,v){
        return this.#check(this.#column(j),v);
    }

    /**
     * Returns true if all the elements of the diagonal one contain the same value v.
     *
     * @param v a value.
     * @returns {boolean} true if all the elements of the diagonal one contain the same value v.
     */
    #checkDiagonalOne(v){
        return this.#check(this.#diagonalOne(),v);
    }

    /**
     * Returns true if all the elements of the diagonal two contain the same value v.
     *
     * @param v a value.
     * @returns {boolean} true if all the elements of the diagonal two contain the same value v.
     */
    #checkDiagonalTwo(v){
        return this.#check(this.#diagonalTwo(),v);
    }

    /**
     * Retruns true if the value v placed at the position(i,j) let the player win.
     *
     * @param i row index.
     * @param j column index.
     * @param v symbol value.
     * @returns {boolean} true if the value v placed at the position(i,j) let the player win.
     */
    #checkWinner(i,j,v){
        let flag = this.#checkRow(i, v);
        if(!flag) {flag = this.#checkColumn(j,v);}
        if(!flag && i===j){flag = this.#checkDiagonalOne(v);}
        if (!flag && (i===this.#size-j-1)) { flag = this.#checkDiagonalTwo(v); }
        return flag;
    }

    /**
     * Returns true if the match is over.
     *
     * @returns {boolean} true if the match is over.
     */
    isOver(){
        return (this.#freeSlots === 0) || (this.#winner !== FREE);
    }

    /**
     * Retruns true if the match is a draw.
     *
     * @returns {boolean} if the match is a draw.
     */
    isDraw(){
        return (this.#freeSlots === 0) || (this.#winner === FREE);
    }

    /**
     * Returns the winner of this game.
     *
     * @returns {*} the winner of this game.
     */
    winner(){
        return this.#winner;
    }

    /**
     * Retruns the array of loccations of winner symbols.
     *
     * @returns {[number, number][]} the array of locaitons of winner symbols
     */
    getWitness(){
        return this.#witness;
    }

    printGrid(){
        let arrText = "";
        for (let i = 0; i < this.#size; i++) {
            for (let j = 0; j < this.#size; j++) {
                arrText+=this.#grid[i][j]+' ';
            }
            console.log(arrText);
            arrText='';
        }

    }
}