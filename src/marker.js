import React ,{Component} from 'react';



class Marker extends Component{


  render(){
    return(
      <div {...this.props} style={{display: 'flex', cursor: this.props.onClick ? 'pointer' : 'default', height: this.props.$hover ?11:10, width:this.props.$hover ?11:10, backgroundColor: 'black', borderRadius: 10,  border: '1px solid white'}}>
      {this.props.$hover&&<p style={{ backgroundColor: '#eee',position: 'absolute',bottom:0, borderRadius: '10%', fontSize: 10, padding:3, border:'1px solid black'  }}>{this.props.text}</p>}
     
      </div>
  )
  }
}




export default Marker;
