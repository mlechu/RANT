import React, {Component} from 'react';

export default class Webcamera extends Component {

    constructor(props) {
        super(props)
        }

    render() {
        const element = (<div>You will have 30 seconds to prep and 2 minutes to talk. <br /> <br /> </div>)
        return (
            <div className="comptext">
                <h3>Personalized Interview Prep!!!</h3>
                    {this.props.displaytext}
                    {element}
            </div>
        )
    }
}