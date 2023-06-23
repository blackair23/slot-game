const CONFIG = require('./config.js');

class Slot {
	constructor(CONFIG) {
		this.CONFIG = CONFIG;
	}

	// Spin the reels and generate a random result
	spin() {
		let spinResult = [];
		for (let rowIndex = 0; rowIndex < CONFIG.rowsCount; rowIndex++) {
			let row = [];
			for (let reelIndex = 0; reelIndex < CONFIG.reelsCount; reelIndex++) {
				let currentReel = CONFIG.reels[reelIndex];
				let randomIndex = Math.floor(Math.random() * CONFIG.reels[reelIndex].length); // Generate a random index within the reel length
				row.push(currentReel[randomIndex]);
			}
			spinResult.push(row);
		}

		console.log(`Spin Result -> \n${spinResult.join('\n')}`);
		return spinResult;	
	}


	// Calculate wins based on the spin result
	calculateWins() {
		const spinResult = this.spin();
	
		let winningLines = [];
		let totalWinAmount = 0;
	
		for (let lineIndex = 0; lineIndex < CONFIG.lines.length; lineIndex++) {
	
			let streak = 0; 
			let currSymbol = spinResult[0][0];
	
			for (let cordIndex = 0; cordIndex < CONFIG.lines[lineIndex].length; cordIndex++) {
				let rowIndex = CONFIG.lines[lineIndex][cordIndex];
				let columnIndex = cordIndex;
				let symbolFromCoords = spinResult[rowIndex][columnIndex];
	

				if(symbolFromCoords !== currSymbol){
					proccessWin(streak, lineIndex, currSymbol)
					currSymbol = symbolFromCoords
					streak = 1;
				} else {
					streak += 1;
				}

			}
			
			proccessWin(streak, lineIndex, currSymbol);
		}
	
		function proccessWin(streak, lineIndex, currSymbol){
			if(streak >= 3){
				winningLines.push(lineIndex + 1)
				totalWinAmount += CONFIG.symbols[currSymbol][streak - 1];
			}
		}

		if(winningLines.length <= 0) {
	
			console.log('No winning combinations. Try again!\n');
			return 0;
	
		} else {
	
			console.log(`Congratulations! You won ${totalWinAmount}`);
			console.log(`Winning Line: ${winningLines.join(' | ')}\n`);
	
			return totalWinAmount;
		}
	}
   
	
	// Simulate multiple spins and calculate statistics
	simulateSpins(totalSpins) {

		let totalWins = 0;
		let winningSpinsCounter = 0;

		const startTime = performance.now();
	
		for (let i = 0; i < totalSpins; i++) {
			const spinWinAmount = this.calculateWins();
			if(spinWinAmount > 0) {
				totalWins += spinWinAmount;
				winningSpinsCounter++;
			}
		}
	
		const endTime = performance.now();
	
		const style = 'font-weight: bold; font-size: 2em; color: white';
	
		console.log(`%c----------------------------------------------`, style);
		console.log(`Total Spins: %c${totalSpins}`, style);
		console.log(`Total Wins: %c${totalWins}`, style);
		console.log(`Total Winning Spins: %c${winningSpinsCounter}`, style);
		console.log(`Win Percentage: : %c${((winningSpinsCounter / totalSpins) * 100).toFixed(2)}%`, style);
		console.log(`Execution time: %c${(endTime - startTime).toFixed(2)} ms`, style);
	}
	
}


const slot = new Slot(CONFIG);

slot.simulateSpins(1000);
