import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import GoogleMap from 'google-map-react';
import data from './data.json';
import Marker from './marker';
import {downloadCSV} from './download';
import CustomScroll from 'react-customscroll';

const API_KEY= 'AIzaSyCcoWozx__Xlcj7DWovSOX2WzAO25h7AhQ'

class App extends Component {

  componentWillMount(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(this.success,this.fail,options)
  }

  success=(pos)=>{
    this.setState({
      center:{
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      },
      ready:true
    })

  }

   fail=(err)=>{
    this.setState({
      center:{
        lat:48.8618499,
        lng:2.34719
      },
      ready:true
    })

  }



  constructor(props) {
    super(props);
    this.state = {
      center:{
    lat:48.8618499,
    lng:2.34719
  },
  selectedStore:[],
  ready:false

    };
  }

  itemExist=(item)=>{
    const checkUsername = obj => obj.nom === item.nom;
    return this.state.selectedStore.some(checkUsername)

  }


  pressMarker=(item)=>{
    if(this.itemExist(item)){
    console.log('item exist')
  }else{
    this.setState({ selectedStore: [...this.state.selectedStore, item] })

  }

  }

  download=()=>{
    let formatedArray= this.state.selectedStore.map(item=>({
      nom:item.nom, 
      adresse:item.adresse,
      ...item.position
    }))
    downloadCSV(formatedArray)

  }


  render() {

     return (
        <div style={{display:'flex', flexDirection: 'row', width: '100%' }}>
          <div style={{ height: '100vh', width: '50%'}}>
            <GoogleMap
                bootstrapURLKeys={{ key: API_KEY}}
                defaultCenter={this.state.center}
                defaultZoom={11}>
                  {data.map((item,index)=>(
                    <Marker
                      key={index}
                      onClick={()=>this.pressMarker(item)}
                      lat={item.position.latitude}
                      lng={item.position.longitude}
                      text={item.nom}
                    />
                  ))} 
            </GoogleMap>
          </div>
          <div style={{width: '50%',overflow: 'hidden'}}>
          {this.state.selectedStore.length>0&&
          <button style={{margin:20, height: 50, width: 200, borderRadius: 10 }}onClick={this.download}> download csv</button>
          }{this.state.selectedStore.length>0&&
             <div style={{display: 'flex',backgroundColor: '#eee'}}>
                <div style={styles.cell}>nom</div>
                <div style={styles.cell}>adresse</div>
                <div style={styles.cell}>latitude</div>
                <div style={styles.cell}>longitude</div>
              </div>

          }
            {this.state.selectedStore.map((item,index)=>(
              <div key={index} style={{display: 'flex',backgroundColor: 'white'}}>
                <div style={styles.cell}>{item.nom}</div>
                <div style={styles.cell}>{item.adresse}</div>
                <div style={styles.cell}>{item.position.latitude}</div>
                <div style={styles.cell}>{item.position.longitude}</div>
              </div>
              ))
            }
            
          </div>
          
        </div>
        
    )
  }
}

const styles={
  cell:{
    display: 'flex',
    justifyContent: 'center' ,
     alignItems: 'center' ,
     padding:3,
     fontSize: 12,
     border: '1px solid black', 
     width: '25%'},
}

export default App;
