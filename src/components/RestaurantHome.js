import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import OfferCard from './OfferCard'


class RestaurantHome extends Component {

  state = {
    offer: "",
    earn_month: "",
    redeem_month: "",
    showCouponForm: false,
    allOffers: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createOffer = (e) => {
    e.preventDefault()
    let data = {
      restaurant_id: this.props.current_user.id,
      offer: this.state.offer,
      earn_month: this.state.earn_month,
      redeem_month: this.state.redeem_month
    }
    fetch("http://localhost:3000/api/v1/offers", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accepts": "application/json"
       },
         body: JSON.stringify(data)
       })
       .then(res => res.json())
       .then(res => {
         this.setState( prevState => {
           return { allOffers: [...prevState.allOffers, res] }
         })
       })
     }

 componentDidMount = () => {
     fetch("http://localhost:3000/api/v1/offers")
     .then(res => res.json())
     .then(res =>
       this.setState({
         allOffers: res
       }, () => console.log(this.state.allOffers))
     )
   }

  toggleCouponFormState = () => {
    let toggledCouponForm = !this.state.showCouponForm
    this.setState({
      showCouponForm: toggledCouponForm
    })
  }


  renderRestOffers = () => {
    if (this.state.allOffers == "") {
      return (<p> testing </p>)
    }
    else {
    // let allMonths = ["jan", "feb", "mar", "april", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]
    let ResOffers = this.state.allOffers.filter(res => res.restaurant_id === this.props.current_user.id)
    // let sortedRes0ffers = ResOffers.sort(function(a,b){
    //   return allMonths.indexOf(a) - allMonths.indexOf(b);
    // })
    return ResOffers.map(offer => {
      return <OfferCard offer={offer}/>
    })
  }
}

  renderCouponForm = () => {
    if (this.state.showCouponForm === false) {
      return (
        <div>
          <h1> {this.props.current_user.name} </h1>
          <p> {this.props.current_user.address1} </p>
          <p> {this.props.current_user.city} </p>
          <p> {this.props.current_user.zip_code} </p>
          <button onClick={()=> this.toggleCouponFormState()}> Submit A New Coupon </button>
          <h1> Your Offers </h1>
          {this.renderRestOffers()}

        </div>
      )
    }
  else if (this.state.showCouponForm === true) {
      return (
        <div>
          <h1> this.props.current_user.name} </h1>
          <p> {this.props.current_user.address1} </p>
          <p> {this.props.current_user.city} </p>
          <p> {this.props.current_user.zip_code} </p>
          <button onClick={()=> this.toggleCouponFormState()}> Remove Coupon Form </button>
        <form onSubmit={(e)=>this.createOffer(e)}>
          <label> Select "Earn Month" <br/> This is the month, customers will visit & check-in at your restaurant </label> <br/>
          <select className="month_dropdown" onChange={this.handleChange} name="earn_month" value={this.state.earn_month} >
            <option value="">Select</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="aug">August</option>
            <option value="sept">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>
          <br/>
          Description of Redemption Offer:
          <br/>
          Examples Include:
            <ul>
              <li> $10 OFF A $50 PURCHASE OR MORE </li>
              <li> BUY ONE APPETIZER, GET ONE FREE </li>
              <li> 10% OFF YOUR ENTIRE MEAL </li>
            </ul>
          Offer Description: <input onChange={this.handleChange} type="text"  name="offer" value={this.state.offer}/> <br />
            <br/>
          <label> Select "Redeem Month" This is the month, customers will visit & redeem coupon offers. *Restaurant must be willing to accept all activated offers. </label>
          <select className="month_dropdown" onChange={this.handleChange} name="redeem_month" value={this.state.redeem_month} >
            <option value="">Select</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="aug">August</option>
            <option value="sept">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>
          <br/>
          <button type="submit">Submit Coupon</button>
        </form>
        <h1> Your Offers </h1>
        {this.renderRestOffers()}
      </div>
      )
    }
  }


  render () {
    console.log("user is...", this.props.current_user)
    return (
      <div>
      {this.renderCouponForm()}
      </div>
    )
  }


}

export default connect(mapStateToProps)(RestaurantHome)



function mapStateToProps(state) {
  return {
    current_user: state.current_user
  }
}
