 /*
 写一个函数float sumPossibility(int dice, int target)，
 就是投dice个骰子，求最后和为target的概率。
 因为总共的可能性是6^dice，所以其实就是combination sum，
 */
class Dice {
    private match = 0;
    private dfs = (dice, target) => {
        if (dice === 0 && target === 0) {
            this.match++;
            return;
        }
        if (dice * 6 < target || target < 0) return;
        for (let i = 1; i <= 6; i++) {
            this.dfs(dice - 1, target - i);
        }
    };
    public sumPossibilityDFS = (dice, target) => {
        let total = Math.pow(6, dice);
        this.dfs(dice, target);
        console.log(this.match);
        return this.match/total;
    };
    public sumProssibilityDP = (dice, target) => {
        let total = Math.pow(6, dice);
        const dp = [[]];
        for (let i = 0; i < dice + 1; i++) {
            dp.push(new Array(target + 1));
        }
        for (let j = 1; j <= 6; j++) {
            dp[1][j] = 1;
        }
        for (let i = 2; i <= dice; i++) {
            for (let j = i; j <= target; j++) {
                for (let k = 1; k <= 6 && j - k >= i-1; k++) {
                    dp[i][j] = (dp[i][j] || 0) + dp[i - 1][j - k];
                }
            }
        }
        let count = dp[dice][target];
        return count/total;
    }; 
}

const d = new Dice();
r = d.sumPossibilityDFS(2, 2);
console.log(r);
r = d.sumProssibilityDP(2, 2);
console.log(r);
