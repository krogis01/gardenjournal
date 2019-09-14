import Emitter from 'es6-event-emitter';

let state = {};

let initialState = {
    searchValue: '50211',
    weatherIcon: '1',
    frostDates: [],
    springFrostDate: '',
    startVegetableDates: [],
    vegetableInfo: {
        "beans": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "32",
                    "C": "0"
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "no",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "yes",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": [7, 28]
            },
            "water_reqs": {
                "min_water": "1",
                "max_water": "1.5"
            },
            "sun_reqs": {
                "sun_preference": "sun"
            },
            "growth_info": {
                "days_to_germination": "10",
                "days_to_harvest": "60",
                "height": "12",
                "width": "12",
                "soil_texture": ["fine, medium"]
            },
            "companions": ["array of friends"]
        },
        "beets": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "bell pepper": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "55",
                    "C": "13"
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "yes",
                "days_before_frost": [70, 56]
            },
            "outdoors": {
                "outdoors": "yes",
                "transplant_seedling_days_after_frost": [14, 35],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "2",
                "max_water": "3"
            },
            "sun_reqs": {
                "sun_preference": "sun"
            },
            "growth_info": {
                "days_to_germination": "10",
                "days_to_harvest": "80",
                "height": "12",
                "width": "12",
                "soil_texture": ["fine, medium"]
            },
            "companions": ["array of friends"]
        },
        "broccoli": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "brussels sprout": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "cabbage": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "cantaloupe": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "carrot": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "cauliflower": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "celery": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "collard": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "corn": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "cucumber": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "eggplant": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "lettuce": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "kohlrabi": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "leek": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "okra": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "onion": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "parsnip": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "peas": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "potato": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "pumpkin": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "radish": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "spinach": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "squash": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "sweet potato": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "swiss chard": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "tomato": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "32",
                    "C": "0"
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "yes",
                "days_before_frost": [56, 42]
            },
            "outdoors": {
                "outdoors": "yes",
                "transplant_seedling_days_after_frost": [7, 28],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "2.5",
                "max_water": "3"
            },
            "sun_reqs": {
                "sun_preference": "sun"
            },
            "growth_info": {
                "days_to_germination": "# of days",
                "days_to_harvest": "# of days",
                "height": "",
                "width": "",
                "soil_texture": ["fine, medium"]
            },
            "companions": ["array of friends"]
        },
        "turnip": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        },
        "watermelon": {
            "temperature_reqs": {
                "min_temp": {
                    "F": "",
                    "C": ""
                },
                "max_temp": {
                    "F": "",
                    "C": ""
                }
            },
            "indoors": {
                "start_indoors": "",
                "days_before_frost": []
            },
            "outdoors": {
                "outdoors": "",
                "transplant_seedling_days_after_frost": [],
                "days_after_frost": []
            },
            "water_reqs": {
                "min_water": "",
                "max_water": ""
            },
            "sun_reqs": {
                "sun_preference": ""
            },
            "growth_info": {
                "days_to_germination": "",
                "days_to_harvest": "",
                "height": "",
                "width": "",
                "soil_texture": []
            },
            "companions": ["array of friends"]
        }
    }
}

class Store extends Emitter {
    constructor(initialState) {
        super();

        state = initialState;
    }

    updateGlobalState(changes) {
        state = Object.assign({}, state, changes);
        // console.log(state.startVegetableDates);
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