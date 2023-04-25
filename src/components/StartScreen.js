import "./StartScreen.css"

const StartScreen = ({startGame}) => {                          // 6 esse é o comp do startScreen e chamo o prop dele aqui
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar agora</button>      {/*7 botao pra chamar o prop indicado acima dentro do comp*/}
        <div className="aviso">
        <p>Ainda em desenvolvimento, breve terá atualizações e responsividade para aparelhos moveis...</p>
        </div>
    </div>

    
  )
}

export default StartScreen