import React, { Component } from "react";
import { connect } from "react-redux";
import Seatrow from "./SeatRow";
import "./SeatBooking.css";
import { seatBooking } from '../redux/action'


class SeatBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookedSeat: [],
      prevBookedSeats: [],
      price: 0
    };
  }

  bookSeat = (e) => {
    let bookedSeat = [...this.state.bookedSeat];
    let isFound = false
    for (let i = 0; i < bookedSeat.length; i++) {
        if (bookedSeat[i].seatNo === e.target.value) {
            isFound = true;
        }
    }

    if (isFound) {
        bookedSeat = bookedSeat.filter((ele) => ele.seatNo != e.target.value);
        this.setState({
            bookedSeat: [...bookedSeat],
        });
    } else {
        if (["A", "B", "C", "D", "E"].includes(e.target.value.split('')[0])) {
            console.log('Gold')
            if (this.state.bookedSeat.length === 0) {
                bookedSeat.push({
                    "tname": "gold",
                    "seatNo": e.target.value,
                    "price": 200
                })
            } else if(bookedSeat[0].tname === "gold") {
                bookedSeat.push({
                    "tname": "gold",
                    "seatNo": e.target.value,
                    "price": 200
                })
            } else {
                let arr = []
                arr.push({
                    "tname": "gold",
                    "seatNo": e.target.value,
                    "price": 200
                })
                this.setState({
                    bookedSeat: [...arr]
                })
                return;
            }
        } else {
            console.log('Dimond')
            if (this.state.bookedSeat.length === 0) {
                bookedSeat.push({
                    "tname": "dimond",
                    "seatNo": e.target.value,
                    "price": 500
                })
            } else if(bookedSeat[0].tname === "dimond") {
                bookedSeat.push({
                    "tname": "dimond",
                    "seatNo": e.target.value,
                    "price": 500
                })
            } else {
                let arr = []
                arr.push({
                    "tname": "dimond",
                    "seatNo": e.target.value,
                    "price": 500
                })
                this.setState({
                    bookedSeat: [...arr]
                })
                return;
            }
        }

        let totalPrice = 0
        for (let i = 0; i < bookedSeat.length; i++) {
            totalPrice += bookedSeat[i].price
        }
        this.setState({
            bookedSeat: [...bookedSeat],
            price: totalPrice
        });
    
    }
    console.log(bookedSeat)
  };

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  };

  componentDidMount = async () => {
    // await this.props.getBookedSeats()
  };

  booking =  e => {
    e.preventDefault();
    let bookedSeatsArr = [...this.state.bookedSeat]
    let prevBookedSeats = []
    for (let i = 0; i < bookedSeatsArr.length; i++) {
        prevBookedSeats.push(bookedSeatsArr[i].seatNo)
    }
    this.setState({
        prevBookedSeats: prevBookedSeats
    })
    // this.props.seatBooking(bookedSeatsArr)
  };

  render() {

    var arr = [];
    for (let i = 0; i <= 12; i++) {
      arr.push(<td key={i + 1}>{i + 1}</td>);
    }
    let rowArr = [];
    let seatArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    for (let i = 0; i < 11; i++) {
      if (i == 5) {
        rowArr.push(<tr className='seatVGap'></tr>);
      } else {
        rowArr.push(
          <tr>
            <Seatrow
              rowName={seatArr[i]}
              bookSeat={this.bookSeat}
              prevBookedSeats={this.state.prevBookedSeats}
            />
          </tr>
        );
      }
    }

    return (
      <div className='container'>
            <div className='inputForm my-4 border py-4'>
                <center>
                    <h3 className="text-center">Movie theater</h3>
                </center>
                
            </div>
        <div className='seatStructure'>
            <center>
                <table id='seatsBlock'>
                    <p id='notification'></p>
                    <tr>
                        <td colSpan='24'>
                            <div className='screen text-center'>SCREEN</div>
                        </td>
                        <td rowSpan='20'>
                            <div className='smallBox greenBox'>Selected Seat</div> <br />
                            <div className='smallBox redBox'>Reserved Seat</div>
                            <br />
                            <div className='smallBox emptyBox'>Empty Seat</div>
                            <br />
                        </td>
                        <br />
                    </tr>

                <tr>
                    <td></td>
                    {arr}
                </tr>
                {rowArr}
                </table>
                <br />
                <span>Total Price: </span> <input className="ml-2" value={this.state.price} disabled />
                <br />
                <button className='btn btn-outline-success my-4' onClick={this.booking}>
                Pay Now
                </button>
            </center>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    bookingSeats: state.bookingSeatReducer.bookingSeats,
    bookedSeats: state.bookingSeatReducer.bookedSeats,
});

const mapDispatchToProps = (dispatch) => ({
    seatBooking: (payload) => dispatch(seatBooking(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatBooking);
