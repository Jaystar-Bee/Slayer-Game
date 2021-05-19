var app = new Vue ({
    el: "#game",
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        currentRound: 0,
        winner: null,
        logMessages: [],
    },
    watch:{
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                // Draw
                this.winner = 'draw'
            } else if ( value <= 0 ) {
                // Monster Wins
                this.winner = 'lose'
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                // Draw
                this.winner = 'draw'
            } else if ( value <= 0 ) {
                // Player Wins
                this.winner = 'win'
            }
        },
    },
    computed: {
        monsterbarSlide() {
            if(this.monsterHealth < 0) {
                return {width: `0%` };
            } else {
                return {width: `${this.monsterHealth}%`}
            }
        },
        playerbarSlide() {
            if(this.playerHealth < 0) {
                return {width: `0%`}
            } else {
                return {width: `${this.playerHealth}%`}
            }
        },
        stopSpecialAttack(){
           return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        randomHealth(min, max) {
            return (Math.floor(Math.random() * (max - min) + min))
        },
        attackMonster() {
            this.currentRound++;
            var attackValue = this.randomHealth(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            var attackValue = this.randomHealth(8, 13);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster', 'attack', attackValue);
        },
        specialAttack() {
            this.currentRound++
            var attackValue = this.randomHealth(12, 20);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player', 'special', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++
            var attackValue = this.randomHealth(10, 15);
            if(this.playerHealth + attackValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += attackValue;
            }
            this.addLogMessages('player', 'heal', attackValue);
            this.attackPlayer();

        },
        newGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'lose';
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            })
        }


    },
});