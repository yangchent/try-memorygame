import './SingleCard.css';

function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick =()=> {
        if(!disabled){
            handleChoice(card)
        }
    }

    return (
        <div className={`${flipped ? "flipped" : ""} + card`} >
            <img className="front" src={card.src} alt="card front" />
            <img className="back" src="./../img/pokeball.png" onClick={handleClick} alt="card back" />
        </div>
    )
}
export default SingleCard;