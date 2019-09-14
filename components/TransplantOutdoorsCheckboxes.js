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
        let checkboxes = [];

        if (this.state.startVegetableDates['transplantOutdoorsDates']) {
            for (veggie in this.state.startVegetableDates['transplantOutdoorsDates']) {
                const checkboxText = `You should move your ${veggie} seeds outside between ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][0]} and ${this.state.startVegetableDates['transplantOutdoorsDates'][veggie][1]}`;

                checkboxes.push(<CheckBox key={veggie} title={checkboxText} checked={this.state.checked}/>);
            }
        } else {
            checkboxes.push(<Text>test</Text>);
        }

        console.log(checkboxes);

        return (<View>{checkboxes}</View>);
    }
}