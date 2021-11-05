import React, { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';

class Flights extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.route.params.datas
        }
    }
    componentDidMount=async()=>[
        await console.log("sas",this.state.data)
    ]
    render(){
        return (
            <View style={styles.container}>
               <View>
                   <View style={styles.Type}>
                       <Text style={{color:'gray'}}>Type</Text>
                       <Text  style={{fontSize:hp('3%'),color:'#36454F'}}>{this.state.data.DutyCode}</Text>
                   </View>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:wp('85%')}}> 
                   <View style={styles.Type1}>
                       <Text style={{color:'gray'}}>Airline</Text>
                       <Text  style={{fontSize:hp('3%')}}>{this.state.data.Flightnr}</Text>
                   </View>
                   <View style={styles.Type1}>
                       <Text style={{color:'gray'}}>Flight Number</Text>
                       <Text  style={{fontSize:hp('3%')}}>{this.state.data.Tail}</Text>
                   </View>
                   <View style={styles.Type1}>
                       <Text style={{color:'gray'}}>Tail Number</Text>
                       <Text  style={{fontSize:hp('3%')}}>{this.state.data.Tail}</Text>
                   </View>
                   </View>

                   <View style={styles.Type}>
                       <Text style={{color:'gray'}}>From</Text>
                       <Text  style={{fontSize:hp('3%')}}>{this.state.data.Departure}</Text>
                   </View>

                   <View style={styles.Type}>
                       <Text style={{color:'gray'}}>To</Text>
                       <Text  style={{fontSize:hp('3%')}}>{this.state.data.Destination}</Text>
                   </View>
               </View>
                <View style={styles.AdditionalInfo}>
                    <Text style={{fontSize:hp('3.3%'),color:'gray'}}>Additional Information</Text>
                </View>

                 <View>
                 <View style={styles.AirCraftType}>
                    <Text style={{fontSize:hp('3%'),color:'gray'}}>Aircraft Type</Text>
                    <Text  style={{fontSize:hp('3%')}}>{this.state.data['Aircraft Type']}</Text>
                </View>
                <View style={styles.Type}>
                       <Text style={{color:'gray'}}>Crew Names</Text>
                       <Text  style={{fontSize:hp('3%')}}>CP: {this.state.data.Captain}</Text>
                       <Text  style={{fontSize:hp('3%')}}>FO: {this.state.data["First Officer"]}</Text>
                       <Text  style={{fontSize:hp('3%')}}>FA: {this.state.data["Flight Attendant"]}</Text>
                   </View>
                   <View style={styles.Type}>
                       <Text style={{color:'gray'}}>Start Time</Text>
                       <Text  style={{fontSize:hp('3%')}}>{moment(this.state.data.Date, 'DD/MM/YYYY').format('ddd DD MMM YYYY')} {this.state.data.Time_Depart} Z</Text>
                   </View>
                    <View style={{borderWidth:1,marginTop:hp('1.2%'),borderColor:'gray',alignSelf:'center',width:wp('85%')}}/>
                   <View style={styles.Type}>
                       <Text style={{color:'gray'}}>End Time</Text>
                       <Text  style={{fontSize:hp('3%')}}>{moment(this.state.data.Date, 'DD/MM/YYYY').format('ddd DD MMM YYYY')} {this.state.data.Time_Arrive} Z</Text>
                   </View>
                 </View>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
       height:hp('87%'),
       width:wp('94%'),
       alignSelf:'center',
       marginTop:hp('1.5%'),
       backgroundColor:'white',
       borderRadius:3,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 3,
       },
       shadowOpacity: 0.29,
       shadowRadius: 4.65,
       
       elevation: 7,
      
    },
     Type:{
         marginLeft:wp('5%'),
         marginTop:hp('1.5%')
     },
     Type1:{
         marginLeft:wp('5%'),
         marginTop:hp('1.5%'),
     },
     AdditionalInfo:{
        marginLeft:wp('5%'),
        marginTop:wp('5%'),
         
     },
     AirCraftType:{
        marginLeft:wp('5%'),
        marginTop:wp('5%'),
     }
});


export default Flights;