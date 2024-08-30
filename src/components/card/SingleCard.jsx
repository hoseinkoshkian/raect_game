import "./card.css"
export default function SingleCard({ card, handelChoise, flipped, disabled }) {
    const handelClick = () => {
        if (!disabled) {
            handelChoise(card)
        }
    }

    return (
        <div className='card' >
            <div className={flipped ? "flipped" : "s"}>
                <img className='front' src={card.src} alt="card front" />
                <img
                    className='back'
                    src="img/cover.png"
                    onClick={handelClick}
                    alt="card back"
                />
            </div>
        </div>
    )
}