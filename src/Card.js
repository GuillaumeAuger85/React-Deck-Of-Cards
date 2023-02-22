import React, { Component } from 'react'
import './Card.css'

class Card extends Component {
    render() {
        return (
            <img className='Card' style={{ transform: `rotate(${this.props.rotationAngle}deg) translate(${this.props.verTranslate}px,${this.props.horTranslate}px)`}} src={this.props.src} alt={this.props.alt} />
        )
    }
}

export default Card