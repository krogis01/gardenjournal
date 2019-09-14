import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import store from '../utils/store';
import { getFrostDates } from '../utils/frostDateInfo';

export default class TransplantOutdoorsCheckboxes extends Component {
    constructor(props) {
        super(props);

        this.state = store.getGlobalState();

        this.updateState = this.updateState.bind(this);
    }

    updateState() {
        this.setState(store.getGlobalState());
        this.updateState = this.updateState.bind(this);
    }

    componentWillMount() {
        store.subscribe(this.updateState);
    }

    componentWillUnmount() {
        store.unsubscribe(this.updateState);
    }

    render() {
        let todayCheckboxes = [];
        let futureCheckboxes = [];

        if (this.state.startVegetableDates['transplantOutdoorsDates']) {
            for (veggie in this.state.startVegetableDates['transplantOutdoorsDates']) {
                actionDate = this.state.startVegetableDates['transplantOutdoorsDates'][veggie][0];
                todayDate = new Date();
                formattedTodayDate = `${todayDate.getMonth()} ${todayDate.getDate()} ${todayDate.getFullYear()}`;
                formattedActionDate = `${actionDate.getMonth()} ${actionDate.getDate()} ${actionDate.getFullYear()}`;

                const checkboxText = `You should move your ${veggie} seeds outside between ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][0]} and ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][1]}`;

                if (formattedTodayDate === formattedActionDate) {
                    todayCheckboxes.push(<CheckBox key={veggie} title={checkboxText} checked={this.state.checked}/>);
                } else {
                    futureCheckboxes.push(<CheckBox key={veggie} title={checkboxText} checked={this.state.checked}/>);
                }
            }
        } else {
            futureCheckboxes.push(<Text key='test'>test</Text>);
        }

        if (todayCheckboxes.length > 0) {
            return (
                <View>
                    <Text key='today'>Today</Text>
                    {todayCheckboxes}
                    
                    <Text key='upcoming'>Upcoming Transplants</Text>
                    {futureCheckboxes}
                </View>
                
            );
        } else {
            return (
                <View>
                    <Text key='upcoming'>Upcoming Transplants</Text>
                    {futureCheckboxes}
                </View>
                
            );
        }
    }
}