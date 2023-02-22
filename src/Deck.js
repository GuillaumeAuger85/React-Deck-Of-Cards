import React, { Component } from 'react'
import Card from './Card'
import axios from 'axios'
import './Deck.css'


class Deck extends Component {
    static defaultProps = {
        cardNumber: 52
    }
    constructor(props) {
        super(props)
        this.state = {
            deck_id: undefined,
            cards: [],
            src: '',
            alt: '',
            code: '',
            remaining: this.props.cardNumber
        }
        this.getNewCard = this.getNewCard.bind(this)
    }
    async getNewCard() {
        if (this.state.remaining > 0) {
            let rotationAngle = Math.floor(Math.random() * 360) + 1
            let verticalTranslate =  Math.floor(Math.random() * 55) + 1
            let horizontalTranslate =  Math.floor(Math.random() * 55) + 1
            let url = `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`
            let newInfos = await axios.get(url)
            console.log(newInfos)
            let newCard = newInfos.data.cards[0]
            newCard = { ...newCard, rotationAngle: rotationAngle,verTranslate:verticalTranslate, horTranslate: horizontalTranslate }
            this.setState(st => ({
                cards: [...st.cards, newCard],
            }))
            this.setState({
                remaining: newInfos.data.remaining,
                src: newCard.image,
                alt: `${newCard.value} ${newCard.suit}`,
                code: newCard.code,
            })
        } else {
            alert('Error: no cards remaining')
        }
    }
    async componentDidMount() {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle'
        let cardInfos = await axios.get(url)
        const id = cardInfos.data.deck_id
        this.setState({ deck_id: id })
    }
    render() {
        const card = this.state.cards.map(card =>
            <Card rotationAngle={card.rotationAngle} horTranslate={card.horTranslate} verTranslate={card.verTranslate} src={card.image} alt={`${card.value} ${card.suit}`} key={card.code} />
        )
        return (
            <div className='Deck'>
                <h1 className='Deck-title'>&#9826; CARD DEALER &#9826; </h1>
                <h2 className='Deck-title subtitle'>♦ A LITTLE DEMO WITH REACT ♦</h2>
                <button onClick={this.getNewCard}>DEAL ME A CARD</button>
                <div className='Deck-CardContainer'>
                {this.state.remaining === this.props.cardNumber ? <div></div> : card}
                </div>
                
            </div>
        )
    }
}
export default Deck;