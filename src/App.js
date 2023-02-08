// CSS
import './App.css';

//REACT    importação de hooks
import {useCallback, useEffect, useState} from "react"

//data
import {wordsList} from "./data/words"

//components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';

const stages = [
{id: 1, name:"start"},
{id: 2, name:"game"},                                                         // 1 criandos as telas/fases que o game vai ter
{id: 3, name:"end"}
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)                  //2 definindo uma variavel que vai fazer esse controle de mudança de tela
  const [words] = useState(wordsList)

  // 8 criando variaveis controladoras de pavavras/categorias/letras respectivamente
  const [pickedWord, setPickedword] = useState ("")
  const [pickedCategory, setPickedCategory] = useState ("")
  const [letters,setLetters] = useState ([])

  const [guessedLetters,setGuessedLetters] = useState ([])          // letras adivinhadas
  const [wrongLetters,setWrongLetters] = useState ([])              // letras erradas
  const [guesses,setGuesses] = useState(guessesQty)                          // chances/tentativas
  const [score,setScore] = useState (0)                             //pontuação
  // 9 pegando uma categoria aleatoria
  const pickWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)   

  // 10 pegando palavra aleatoria daquela categoria aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)
    
    return {word, category}
  },[words])

  // starts the secret words game
  const startGame = useCallback(() => {     
    
    clearLettersStates ()         // 4 funcao para mudar para tela do jogo
    
    const {word,category} = pickWordAndCategory()           // isso se chama desestruturação(puxei do return pra ca)
    
   // 11 criar um array  das letras
    let wordLetters = word.split("") 
    // 12 trantando a palavra pra ficar todas as letras em minusculo                       
    wordLetters = wordLetters.map((s) => s.toLowerCase())    

    // 13 setando os estados
    setPickedCategory(category)
    setPickedword(word)
    setLetters(wordLetters)

    //console.log(words,category)
    console.log(wordLetters)


    setGameStage(stages[1].name)
    
  },[pickWordAndCategory] )
  
  // process the letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    //checar se a letra ja foi utilizada

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    // colocar uma tentativa de letra ou remover uma chance 
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,normalizedLetter,
      ])
    }   else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  
  }

  const clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters ([])
  }

  useEffect(() => {
    if(guesses <=0){
      clearLettersStates ()     //limpar todos os states

      setGameStage(stages[2].name)
    }
  },[guesses])

  // checar condição de vitoria
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

  // condição de vitoria   
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // adicionar score
      setScore((actualScore) => actualScore += 100)
      //reiniciar game com nova palavra
      startGame ()
    }
  },[guessedLetters,letters,startGame,gameStage])
  // retry game
  const retry = () => {
    setScore (0)
    setGuesses (guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}   {/*5 aqui digo que o componente "startScreen"esta ligado na funcao startGame prop*/}
      {gameStage === "game" && (
       <Game 
      verifyLetter={verifyLetter}
       pickedWord={pickedWord} 
       pickedCategory={pickedCategory} 
       letters={letters}
       guessedLetters={guessedLetters}
       wrongLetters = {wrongLetters}
       guesses={guesses}
       score = {score}

       />)}   
                                     
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}


    </div>
  );
}

export default App;
