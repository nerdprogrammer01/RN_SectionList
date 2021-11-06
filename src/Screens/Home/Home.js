

import React from "react";
import { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView, SectionList, Button, StatusBar } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerGetApi } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import _ from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            modalVisible: true
        };
    }


    componentDidMount = async () => {

        const data = await AsyncStorage.getItem('Api_data');
        // console.log("finalArr",JSON.parse(data))
        if (data != null) {
            this.setData(JSON.parse(data));
            console.log("Async storage")
        } else {
            this.onLogin();
            console.log("on Api call")
        }

         setTimeout(() => { this.toggleModal() }, 2500);
    }

    onLogin = () => {
        this.props.triggerGetApi(this.onLoginSuccess, this.onLoginError);
    }
    onLoginSuccess = async (data) => {
        await AsyncStorage.setItem('Api_data', JSON.stringify(data))
        await this.setData(data)

    }

    onLoginError = (data) => {
        console.log("log errorr", data)
    }

    setData = (data) => {
        var finalData = [];
        data.reduce((groupedArray, items) => {
            const newDate = items.Date;
            if (groupedArray[newDate] == null) {
                groupedArray[newDate] = [];
            }
            groupedArray[newDate].push(items);
            finalData.push({
                'title': newDate,
                'data': groupedArray[newDate]
            });
            return finalData
        }, []);

        var non_duplidated_data = _.uniqWith(finalData, _.isEqual);
        this.setState({
            data: non_duplidated_data
        })

    }

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    };



    Item = (item) => (

        <TouchableOpacity
            //onPress={()=>  console.log(item.title.item)}
            onPress={() => this.props.navigation.navigate('Flights', { datas: item.title.item })}
            style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1, height: hp('8%') }}>
            <View style={{ marginLeft: wp('3%'), alignContent: 'center', alignItems: 'center', width: wp('50%'), flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {item.title.item.DutyCode == 'FLIGHT' ? <Icon name="plane" size={hp('5%')} color="#36454F" />
                    :
                    item.title.item.DutyCode == 'Standby' ? <Icon name="clipboard" size={hp('5%')} color="#36454F" /> :
                        item.title.item.DutyCode == 'LAYOVER' ? <Icon name="suitcase" size={hp('5%')} color="#36454F" /> :
                            item.title.item.DutyCode == 'POSITIONING' ?
                                <Icon name="crosshairs" size={hp('5%')} color="#36454F" /> :
                                <Icon1 name="plane-slash" size={hp('4%')} color="#36454F" />
                }
                {item.title.item.DutyCode == 'LAYOVER' ?
                    <View style={{ height: hp('7%'), width: wp('35%'), flexDirection: 'column', alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                        <Text style={{ marginLeft: wp('4%'), alignSelf: 'flex-start', color: '#36454F', fontWeight: 'bold', fontSize: hp('3%') }}>Layover</Text>
                        <Text style={{ marginLeft: wp('4%'), alignSelf: 'flex-start', color: 'gray', fontWeight: 'bold', fontSize: hp('2.2%') }}>{item.title.item.Destination}</Text>
                    </View> :
                    item.title.item.DutyCode == 'Standby' ?
                        <View style={{ height: hp('7%'), width: wp('35%'), flexDirection: 'column', alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text style={{ marginLeft: wp('4%'), alignSelf: 'flex-start', color: '#36454F', fontWeight: 'bold', fontSize: hp('3%') }}>Standby</Text>
                            <Text style={{ marginLeft: wp('4%'), alignSelf: 'flex-start', color: 'gray', fontWeight: 'bold', fontSize: hp('2.2%') }}>{item.title.item.Destination}</Text>
                        </View> :

                        <View style={{ height: hp('7%'), width: wp('35%'), flexDirection: 'column', alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text style={{ alignSelf: 'center', color: '#36454F', fontWeight: 'bold', fontSize: hp('3%') }}>{item.title.item.Departure} - {item.title.item.Destination}</Text>

                        </View>
                }

            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: wp('42%') }}>
                {item.title.item.DutyCode == 'Standby' ? <Text style={{ alignSelf: 'flex-end', color: 'gray', fontSize: hp('2.2%'), marginBottom: hp('0%') }}>Match Crew</Text> : null}
                <Text style={{ alignSelf: 'flex-end', color: '#800000', fontSize: hp('2.3%'), marginBottom: hp('1%') }}>{item.title.item.Time_Depart} - {item.title.item.Time_Arrive}</Text>
            </View>
        </TouchableOpacity>

    );

    modal = () => (
        <View style={{ alignSelf: 'center', width: wp('88%'), height: hp('55%'), backgroundColor: 'white', borderRadius: 15 }}>
            <View style={{alignContent:'center',backgroundColor:'#D3D3D3',height:hp('5%'),borderTopRightRadius:15,borderTopLeftRadius:15}}>
            <Text style={{ fontSize: hp('3.2%'),alignSelf:'center',fontWeight:'bold',color:'gray'}}>Today's Duty</Text>
            </View>
            <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: hp('8%') }}>
             
                <Icon name="plane" size={hp('25%')} color="#36454F" />
                <Text style={{ fontSize: hp('3%'), marginBottom: hp('3%') }}>There is No Duty for Today</Text>
            </View>

            {/* <Text>Hello!</Text>

        <Button title="Hide modal" onPress={()=>this.toggleModal()} /> */}
        </View>
    );

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    onRefresh={() => this.onLogin()}
                    refreshing={this.state.refreshing}
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={(item) => <this.Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{moment(title, 'DD/MM/YYYY').format('ddd DD MMM. YYYY')}</Text>
                        </View>

                    )}
                />
                <Modal isVisible={this.state.modalVisible}>
                    <this.modal />
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp('3%'),

    },
    item: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: hp('0.3%')
    },
    header: {
        fontSize: hp('2.8%'),
        width: wp('100%'),
        height: hp('4.7%'),
        backgroundColor: "#D3D3D3",
        justifyContent: 'center', flexDirection: 'column'
        //textAlign:'center'

    },
    headerText: {
        fontSize: hp('2.4%'),
        marginLeft: wp('4%'),
        fontWeight: 'bold',
        color: '#36454F'

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
    mapStateToProps, mapDispatchToProps
)(Home);;