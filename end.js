const username = document.querySelector('#username')
const saveScorBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
// const mostRecentScore = document.localStorage.getItem('mostRecentScore')
const currentScore = document.getElementById('score').innerText
console.log(currentScore)
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5
const mostRecentScore = document.getElementById('finalScore').innerText
console.log(mostRecentScore)


// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.nodeValue
// })

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    console.log(score.score)
    highScores.push(score)
    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice (5) 
    console.log(highScores)
    localStorage.setItem('highScores', JSON.stringify (highScores))
    window.location.assign('/')
}