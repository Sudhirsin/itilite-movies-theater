import { SEAT_BOOKING } from "./type";
  
  const initState = {
    bookingGoldSeats: 
      { 
        "tname": "gold", 
        "free" : 60, 
        "blocked": 0, 
        "price": 200 
      },

    bookingDimondSeats: { 
      "tname": "diamond", 
      "free" : 60, 
      "blocked": 0, 
      "price": 500
    },

    totalPrice: '',
    bookedSeats: []
  };
  
  const bookingSeatReducer = (state = initState, action) => {
    switch (action.type) {
      case SEAT_BOOKING: 
        let seats = []
        for (let i = 0; i < action.payload.length; i++) {
          seats.push(action.payload[i].seatNo)
        }
        if (action.payload[0].tname === 'gold') {
          return {
            ...state,
            bookingGoldSeats: {
              "tname": "gold", 
              "free" : 60 - action.payload.length, 
              "blocked": action.payload.length, 
              "price": 200 
            } ,
            bookedSeats: [...seats]
          }
        } else {
          return {
            ...state,
            bookingDimondSeats: {
              "tname": "dimond", 
              "free" : 60 - action.payload.length, 
              "blocked": action.payload.length, 
              "price": 500 
            },
            bookedSeats: [...seats]
          }
        }
      
      default:
        return state;
    }
  };
  
  export default bookingSeatReducer;
  