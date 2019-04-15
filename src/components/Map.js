
class MonthlyOffers extends Component {

renderMap = () => {
  const mapStyles = {
  width: '100%',
  height: '100%'
};

  return (
    <Map
         google={this.props.google}
         zoom={14}
         style={mapStyles}
         initialCenter={{
          lat: -1.2884,
          lng: 36.8233
         }}
       />
     )
   }


   export default GoogleApiWrapper({
     apiKey: 'AIzaSyCfIfVkpVNgZlpN9nI7QFlxsrNPkRLCPAo'
   })(Home);
