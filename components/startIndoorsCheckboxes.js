import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import store from '../utils/store';
import { getFrostDates } from '../utils/frostDateInfo';

export default class StartIndoorsCheckboxes extends Component {
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

        if (this.state.startVegetableDates['startIndoorsDates']) {
            for (veggie in this.state.startVegetableDates['startIndoorsDates']) {
                for (date in this.state.startVegetableDates['startIndoorsDates'][veggie]) {
                    actionDate = this.state.startVegetableDates['startIndoorsDates'][veggie][date];
                    todayDate = new Date();
                    todayDate.setMonth(4);
                    formattedTodayDate = `${todayDate.getMonth()} ${todayDate.getDate()} ${todayDate.getFullYear()}`;
                    formattedActionDate = `${actionDate.getMonth()} ${actionDate.getDate()} ${actionDate.getFullYear()}`;
    
                    const checkboxText = `You should start your ${veggie} seeds inside between ${this.state.startVegetableDates['startIndoorsDates'][veggie][0]} and ${this.state.startVegetableDates['startIndoorsDates'][veggie][this.state.startVegetableDates['startIndoorsDates'][veggie].length-1]}`;
    
                    if (formattedTodayDate === formattedActionDate) {
                        todayCheckboxes.push(<CheckBox key={veggie} title={checkboxText} checked={this.state.checked}/>);
                    }
                }
            }
        } else {
            futureCheckboxes.push(<Text key='indoors-test'>You have nothing to start inside today.</Text>);
        }

        if (todayCheckboxes.length > 0 && futureCheckboxes.length > 0) {
            return (
                <View>
                    <Text key='today'>Seeds to start inside today:</Text>
                    {todayCheckboxes}

                    <Text key='upcoming'>Upcoming seeds to start inside:</Text>
                    {futureCheckboxes}
                </View>

            );
        } else if (todayCheckboxes.length > 0 && futureCheckboxes.length === 0) {
            return (
                <View>
                    <Text key='today'>Seeds to start inside today:</Text>
                    {todayCheckboxes}

                    <Text key='upcoming'>You have no upcoming seeds to start inside.</Text>
                    {futureCheckboxes}
                </View>
            )
        } else if (todayCheckboxes.length === 0 && futureCheckboxes.length > 0) {
            return (
                <View>
                    <Text key='today'>Seeds to start inside today:</Text>
                    {todayCheckboxes}

                    <Text key='upcoming'>Upcoming seeds to start inside:</Text>
                    {futureCheckboxes}
                </View>
            )
        } else {
            return (
                <View>
                    <Text key='today'>Today</Text>
                    <Text key='nothing'>You have no seeds to start inside today or in the near future.</Text>
                </View>

            );
        }
    }
}