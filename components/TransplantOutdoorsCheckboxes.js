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
                    formattedTodayDate = `${todayDate.getMonth()} ${todayDate.getDate()} ${todayDate.getFullYear()}`;
                    formattedActionDate = `${actionDate.getMonth()} ${actionDate.getDate()} ${actionDate.getFullYear()}`;
    
                    const checkboxText = `You should move your ${veggie} seedlings outside between ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][0]} and ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][this.state.startVegetableDates['transplantOutdoorsDates'][veggie].length-1]}`;
    
                    if (formattedTodayDate === formattedActionDate) {
                        todayCheckboxes.push(<CheckBox key={veggie} title={checkboxText} checked={this.state.checked}/>);
                    }
                }
            }
        } else {
            futureCheckboxes.push(<Text key='outdoors-test'>You have nothing to transplant outside today.</Text>);
        }

        if (todayCheckboxes.length > 0 && futureCheckboxes.length > 0) {
            return (
                <View>
                    <Text key='today'>Seeds to transplant outside today:</Text>
                    {todayCheckboxes}

                    <Text key='upcoming'>Upcoming seeds to transplant outside:</Text>
                    {futureCheckboxes}
                </View>

            );
        } else if (todayCheckboxes.length > 0 && futureCheckboxes.length === 0) {
            return (
                <View>
                    <Text key='today'>Seeds to transplant outside today:</Text>
                    {todayCheckboxes}

                    <Text key='upcoming'>You have no upcoming seeds to transplant outside.</Text>
                    {futureCheckboxes}
                </View>
            )
        } else if (todayCheckboxes.length === 0 && futureCheckboxes.length > 0) {
            return (
                <View>
                    <Text key='today'>Seeds to transplant outside today:</Text>
                    {todayCheckboxes}

                    <Text key='upcoming'>Upcoming seeds to transplant outside:</Text>
                    {futureCheckboxes}
                </View>
            )
        } else {
            return (
                <View>
                    <Text key='today'>Today</Text>
                    <Text key='nothing'>You have no seeds to transplant outside today or in the near future.</Text>
                </View>

            );
        }
    }
}