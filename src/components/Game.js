import "./Game.css"
import {useState,useRef} from "react"           // 1 USO DO REF: chama o hook hef (muito util)
const Game = ({verifyLetter,pickedWord,pickedCategory,letters,guessedLetters,wrongLetters,guesses,score}) => {

  const[letter,setLetter] = useState("")        
  const letterInputRef = useRef(null)       // 2 USO DO REF: cria uma const com um nome aleatorioRef desse mesmo modelo

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")
    letterInputRef.current.focus()        /*4 USO DO REF: agora com ele ja em mão, eu digo o que eu quero fazer com essa referencia do input.*/
  }
  return (
    <div className="game">
       <p className="points">
          <span>Pontuação: {score}</span>
       </p>
       <h1>Adivinhe a palavra:</h1>
       <h3 className="tip">
         Dica sobre a palavra: <span>{pickedCategory}</span>
       </h3>
       <p>Você ainda tem {guesses} tentativas </p>
        <div className="wordContainer">
         {letters.map((letter,i) => (
            guessedLetters.includes(letter) ? (
          <span key={i} className="letter">
            {letter}
          </span>
        ) : (
          <span key={i} className="blankSquare"></span>
        )))}
       </div>
        <div className="lettersContainer">
          <p>Tente advinhas uma letra da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}/>          {/*3 USO DO REF: dentro do input cria um atributo novo chamado REF, e SETO minha referencia criada no 2*/}
            <button>Jogar!</button>
          </form>
         <div className="wrongLettersContainer">
            <p>Letras ja utilizadas:</p>
            {wrongLetters.map((letter,i) => (
              <span key={i}>{letter},</span>
            ))}
          </div> 

        </div>
    </div>
    
  )
}

export default Game