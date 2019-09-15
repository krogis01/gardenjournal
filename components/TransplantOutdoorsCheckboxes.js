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
                for (date in this.state.startVegetableDates['transplantOutdoorsDates'][veggie]) {
                    actionDate = this.state.startVegetableDates['transplantOutdoorsDates'][veggie][date];
                    todayDate = new Date();
                    todayDate.setMonth(4);
                    console.log(todayDate);
                    formattedTodayDate = `${todayDate.getMonth()} ${todayDate.getDate()} ${todayDate.getFullYear()}`;
                    formattedActionDate = `${actionDate.getMonth()} ${actionDate.getDate()} ${actionDate.getFullYear()}`;
    
                    const checkboxText = `You should move your ${veggie} seedlings outside between ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][0]} and ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][this.state.startVegetableDates['transplantOutdoorsDates'][veggie].length-1]}`;
    
                    console.log(formattedActionDate, formattedTodayDate)
                    if (formattedTodayDate === formattedActionDate) {
                        todayCheckboxes.push(<CheckBox key={veggie} title={checkboxText} checked={this.state.checked}/>);
                    }
                }
            }
        } else {
            futureCheckboxes.push(<Text key='outdoors-test'>You have nothing to transplant outside today.</Text>);
        }

        if (todayCheckboxes.length > 0) {
            return (
                <View>
                    <Text key='today'>Seeds to Transplant Outside Today</Text>
                    {todayCheckboxes}

                    <Text key='upcoming'>Upcoming Seeds to Transplant Outside</Text>
                    {futureCheckboxes}
                </View>

            );
        } else {
            return (
                <View>
                    <Text key='today'>Today</Text>
                    <Text key='nothing'>You have nothing to transplant outside today</Text>

                    <Text key='upcoming'>Upcoming Seeds to Transplant Outside</Text>
                    {futureCheckboxes}
                </View>

            );
        }
    }
}