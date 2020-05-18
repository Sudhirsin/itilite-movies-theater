import React, { Component } from 'react'

export default class Seatrow extends Component {
    render() {
        var seatsArr = []
        for (let i = 0; i <= 12; i++){
            if (this.props.prevBookedSeats.indexOf(this.props.rowName+(i+1)) >= 0 ) {
                seatsArr.push((<td  style = {{backgroundColor: 'red'}}>
                                    <input 
                                        type="checkbox" 
                                        disabled
                                    />
                                </td>))
            } else {
                if (i == 5) {
                    seatsArr.push(<td className="seatGap"></td>)
                } else if (i !== 5) {
                    seatsArr.push((<td>
                                        <input 
                                            type="checkbox" 
                                            onClick={this.props.bookSeat} 
                                            className="seats" 
                                            value={`${this.props.rowName}${i+1}`} 
                                        />
                                    </td>))
                } 
            }
        }
        return (
            <React.Fragment>
                    <td className="p-2 m-2">{this.props.rowName}</td>
                    {seatsArr}
            </React.Fragment>
        )
    }
}