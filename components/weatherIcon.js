import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default class WeatherIcon extends Component {
    constructor(props) {
        super(props);

        this.state= {
            weatherIcon: '1'
        }
    }

    componentWillReceiveProps(props) {
        this.setState(props);
    }

    render() {
        return (
            <TextInput>Location Key is {this.state.weatherIcon}</TextInput>
        )
    }
}