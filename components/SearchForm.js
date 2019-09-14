import React, { Component } from 'react';
import {
    TextInput,
    Button,
    View
  } from 'react-native';
import { getWeatherData } from '../utils/weatherApi';
import { getFrostDates } from '../utils/frostDateInfo';
import store from '../utils/store';

export default class SearchForm extends Component {
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

    handleChange(text) {
        store.updateGlobalState({searchValue: text});
    }

    handleClick() {
        getWeatherData();
        getFrostDates();
        this.handleChange(this.state.text);
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type your zip!"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button onPress = {() => {
                    this.handleClick();
                }}
                title="Press Me"
                />
            </View>
        )
    }
}