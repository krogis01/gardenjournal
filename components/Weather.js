import React, { Component } from 'react';
import {
    View
  } from 'react-native';
import { getWeatherData } from '../utils/weatherApi';
import store from '../utils/store';
import SearchForm from './SearchForm';
import WeatherIcon from './weatherIcon';

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = store.getGlobalState();

        getWeatherData();

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
                <SearchForm />
                <WeatherIcon />
            </View>
        )
    }
}