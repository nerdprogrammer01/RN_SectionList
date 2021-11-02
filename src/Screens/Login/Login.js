

import React from "react";
import { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, Button } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerGetApi } from '../../actions';

const DATA = [
    {
        title: "Main dishes",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
        title: "Drinks",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"]
    }
];

class Login extends Component {
    state={
        data:[],
        refreshing:false
    }

componentDidMount=()=>{
    this.onLogin();

    
}

    onLogin = () => {
        
    this.props.triggerGetApi( this.onLoginSuccess, this.onLoginError);
  } 
  onLoginSuccess=async(data)=>{

    //  const uTable = data.reduce((acc, it) => (acc['data'] = it, acc), {})
    //  console.log(uTable);

    var array =data;
//             var are=[]
//     const mappedStartDate = data.reduce((groupeElement, element ) => {
//       //  console.log("element :- ",groupeElement);
//             var startArray = (element.Date)
           
                     
//             if(groupeElement[startArray] == null){
//                     groupeElement[startArray] = [];
//                   }
//                   groupeElement[startArray].push({element,data:startArray});
            
      

//             return groupeElement;
    
         
//              console.log("index :- ",index);
//     }, {});

//    console.log("mapped start Date :- ",JSON.stringify(mappedStartDate));
   


// let a=[]
// let i=0
// for(i;i<array.length;i++){
//   a.push({'title':array[i].Date,'data':[array[i]]})
// }
// //console.log(a);
// await this.setState({data:a});

var finalData = [];
data.reduce((groupedArray, items) => {
    const newDate = items.Date;
    if(groupedArray[newDate] == null){
        groupedArray[newDate] = [];
    }
    groupedArray[newDate].push(items);
    finalData.push({
        'title': newDate,
        'data': groupedArray[newDate]
    });
    return finalData
},[]);

console.log(JSON.stringify(finalData));




var finalData = [];
data.reduce((groupedArray, items) => {
    const newDate = items.Date;
    if(groupedArray[newDate] == null){
        groupedArray[newDate] = [];
    }
    groupedArray[newDate].push(items);
    finalData.push({
        'title': newDate,
        'data': groupedArray[newDate]
    });
    return finalData
},[]);

console.log(JSON.stringify(finalData));


this.setState({
    data:finalData
})
// const people = [
//     { name: 'Lee', age: 21 },
//     { name: 'Ajay', age: 20 },
//     { name: 'Jane', age: 20 }
//  ];
//  function groupBy(objectArray, Date) {
//     return objectArray.reduce((acc, obj) => {
//        const key = obj[Date];
//        if (!acc[key]) {
//           acc[key] = [];
//        }
//        // Add object to list for given key's value
//        acc[key].push({'data':obj});
//        return acc;
//     }, {});
//  }
//  const groupedPeople = groupBy(array, {});
//  console.log(groupedPeople);

  }
   
  onLoginError=(data)=>{
    console.log("log errorr",data)
}


    Item = (item) => (
     
        <View style={styles.item}>
         
            <Text style={styles.title}>{item.title.item.Destination}</Text>
        </View>
    );

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                onRefresh={() =>this.onLogin()}
                refreshing={this.state.refreshing}
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={(item) => <this.Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
       
    },
    item: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: hp('0.3%')
    },
    header: {
        fontSize: hp('2.8%'),
        width: wp('100%'),
        height:hp('4.7%'),
        backgroundColor: "gray",
        textAlign:'center'
    },
    title: {
        fontSize: 24
    }
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        triggerGetApi
    }, dispatch)
  }
  

const mapStateToProps = (state) => {
    let {
        apiObj
    } = state.authReducer
  
  
    return { apiObj }
  }

  export default connect(
    mapStateToProps,mapDispatchToProps
  )(Login);;