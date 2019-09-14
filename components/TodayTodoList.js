import React, { Component } from 'react';
import { View } from 'react-native';
import store from '../utils/store';
import StartOutdoorsCheckboxes from './StartOutdoorsCheckboxes';
import TransplantOutdoorsCheckboxes from './TransplantOutdoorsCheckboxes';
import StartIndoorsCheckboxes from './startIndoorsCheckboxes';
import { getFrostDates } from '../utils/frostDateInfo';

export default class TodayTodoList extends Component {
    constructor(props) {
        super(props);

        this.state = store.getGlobalState();

        getFrostDates();

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
        return (
            <View>
                <StartOutdoorsCheckboxes />
                <TransplantOutdoorsCheckboxes />
                <StartIndoorsCheckboxes />
            </View>
        )
    }
}

// console.log(`You should start your ${vegetable} inside between ${startVegetableDates.startIndoorsDates[vegetable][0]} and ${startVegetableDates.startIndoorsDates[vegetable][1]}`);