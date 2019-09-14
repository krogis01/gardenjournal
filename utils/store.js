import Emitter from 'es6-event-emitter';

let state = {};

let initialState = {
    searchValue: '50211',
    list: []
}

class Store extends Emitter {
    constructor(initialState) {
        super();

        state = initialState;
    }

    updateGlobalState(key, changes) {
        state = Object.assign(key, state, changes);
        console.log(state);
        this.trigger('stateChange');
    }

    getGlobalState() {
        return state;
    }

    subscribe(cb) {
        this.on('stateChange', cb);
    }

    unsubscribe(cb) {
        this.off('stateChange', cb);
    }
}

const instance = new Store(initialState);
export default instance;