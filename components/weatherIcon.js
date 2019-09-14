import React, { Component } from 'react';
import { TextInput } from 'react-native';
import store from '../utils/store';
import { Ionicons } from '@expo/vector-icons';

export default class WeatherIcon extends Component {
    constructor(props) {
        super(props);

        iconOptions = {
            sunny: ['1', '2', '3','4','5', '30', '33', '34'],
            cloudy: ['6', '7', '8', '9', '10', '11', '31', '35', '36', '37', '38'],
            rainy: ['12', '13', '14', '15', '16', '17', '18', '39', '40', '41', '42'],
            snowy: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '43', '44'],
            windy: ['32']
        }

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
        if (iconOptions['sunny'].includes(JSON.stringify(this.state.weatherIcon))) {
            return (<Ionicons name="md-sunny" size={99} color="black" />)
        } else if (iconOptions['cloudy'].includes(JSON.stringify(this.state.weatherIcon))) {
            return (<Ionicons name="md-partly-sunny" size={99} color="black" />)
        } else if (iconOptions['rainy'].includes(JSON.stringify(this.state.weatherIcon))) {
            return (<Ionicons name="md-rainy" size={99} color="black" />)
        } else if (iconOptions['snowy'].includes(JSON.stringify(this.state.weatherIcon))) {
            return (<Ionicons name="md-snow" size={99} color="black" />)
        } else if (iconOptions['windy'].includes(JSON.stringify(this.state.weatherIcon))) {
            return (<Feather name="wind" size={99} color="black" />)
        } else {
            return (<TextInput>sunny</TextInput>)
        }
    }
}
