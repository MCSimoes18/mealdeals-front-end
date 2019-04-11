import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import OfferCard from './OfferCard'
import { Grid, Container, Form, Select, List, Input, Divider, Button, Header, Icon, Label, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'



class RestaurantHome extends Component {

  state = {
    offer: "",
    earn_month: "",
    redeem_month: "",
    showCouponForm: false,
    allOffers: "",
    animation: 'scale down',
    direction: 'left',
    dimmed: false,
    visible: false,
    displayContent: 'coupon',
    displayHeader: 'Your Offers',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateContent = (content, header) => {
    this.setState({
      displayContent: content,
      displayHeader: header
    })
  }

  renderOfferDescription = (passedOffer) => {
    this.setState({
      offer: passedOffer
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
      return <OfferCard offer={offer} />
    })
  }
}

  renderCouponForm = () => {
    const monthOptions = [
      { key: 'January', text: 'January', value: 0 },
      { key: 'February', text: 'February', value: 1 },
      { key: 'March', text: 'March', value: 2 },
      { key: 'April', text: 'April', value: 3},
      { key: 'May', text: 'May', value: 4 },
      { key: 'June', text: 'June', value: 5 },
      { key: 'July', text: 'July', value: 6 },
      { key: 'August', text: 'August', value: 7 },
      { key: 'September', text: 'September', value: 8},
      { key: 'October', text: 'October', value: 9 },
      { key: 'November', text: 'November', value: 10 },
      { key: 'December', text: 'December', value: 11 },
    ]

    let offer1 = "$10 OFF A $50 PURCHASE OR MORE"
    let offer2 = "BUY ONE APPETIZER, GET ONE FREE"
    let offer3 = "10% OFF YOUR ENTIRE MEAL"
      return (
        <div>
          <h4> Valid At: </h4>
          <List>
            <List.Item>
              <List.Icon name='food' />
              <List.Content>{this.props.current_user.name} </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>{this.props.current_user.address1}, {this.props.current_user.city} {this.props.current_user.zip_code} </List.Content>
            </List.Item>
          </List>

          <Form onSubmit={(e)=>this.createOffer(e)}>

          <Segment style={{height: '900px;'}} >
            <Grid columns={2}  >
              <Grid.Column>
                <Container fluid className="EarnMonth">
                  <h2> Earn Month </h2>
                  <h4>Customers will check-in at your restaurant during this month </h4> <br/> <br/> <br/>
                  <Select placeholder='Select Earn Month' options={monthOptions} onChange={this.handleChange}/><br/> <br/>
                </Container>
              </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Container fluid className="RedeemMonth">
                <h2> Redeem Month </h2>
                <h4> Customers will redeem coupon offers this month </h4>
                <p> **Restaurant must be willing to accept all activated offers. </p> <br/>
                <Select placeholder='Select Redeem Month' options={monthOptions} onChange={this.handleChange}/><br/> <br/>
              </Container>
              </Grid.Column>
              </Grid>
              <Divider vertical>AND</Divider>
              </Segment>


          <Container fluid className="description">
          <h2 className="offerTitle"> Offer Description </h2>
          <h4> Suggested Offers </h4>
          <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content floated='right'>
              <Button onClick={() => this.renderOfferDescription(offer1)}>Use This Offer</Button>
            </List.Content>
            <List.Content> {offer1} </List.Content>
          </List.Item>

            <List.Item>
            <List.Content floated='right'>
              <Button onClick={() => this.renderOfferDescription(offer2)}>Use This Offer</Button>
            </List.Content>
            <List.Content> {offer2} </List.Content>
          </List.Item>
          <List.Item>

            <List.Content floated='right'>
              <Button onClick={() => this.renderOfferDescription(offer3)}>Use This Offer</Button>
            </List.Content>
            <List.Content> {offer3} </List.Content>
          </List.Item>
          </List>

          <Form.Field floated='center' control={Input} label='Offer Description'
             onChange={this.handleChange} type="offer" name="offer" value={this.state.offer}/><br/>
          <div className='centerBtn'>
          <Form.Field control={Button} content='Submit Offer'type="submit" />
          </div>
          </Container>
        </Form>
      </div>
      )
  }

    renderContent = () => {
    if (this.state.displayContent === 'coupon') {
         return (
          <div>
          <h1> {this.props.current_user.name} </h1>
          <p> {this.props.current_user.address1} </p>
          <p> {this.props.current_user.city} </p>
          <p> {this.props.current_user.zip_code} </p>
          {this.renderRestOffers()}
          </div>
      )
    } else if (this.state.displayContent === 'food') {
      return (
        this.renderCouponForm()
      )
    } else if (this.state.displayContent === 'setting'){
      console.log("this will update user info")
    }
  }


  render () {
    const { activeItem } = this.state
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
    console.log("user is...", this.props.current_user)
    return (
      <Sidebar.Pushable as={Segment} className="sideNav">
        <Sidebar as={Menu} animation='scale down' icon='labeled' vertical visible width='thin'>
          <Menu.Item as='a' className="navContent1" onClick={() => this.updateContent('coupon', 'Your Offers')}>
          <Icon name='cut' />
           My Offers
          </Menu.Item >
          <Menu.Item as='a' className="navContent" onClick={() => this.updateContent('food', 'Submit a New Offer')}>
            <Icon name='food' />
            Submit A New Offer
          </Menu.Item>
          <Menu.Item as='a' className="navContent" onClick={() => this.updateContent('setting')}>
            <Icon name='setting' />
            Settings
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic dimmed={dimmed && visible}>
            <Header as='h3'></Header>
            <h1> Welcome Back {this.props.current_user.name} ! </h1>
            <Divider />
            <h2> {this.state.displayHeader}</h2>
            <Divider />
            {this.renderContent()}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }


}

export default connect(mapStateToProps)(RestaurantHome)



function mapStateToProps(state) {
  return {
    current_user: state.current_user
  }
}
