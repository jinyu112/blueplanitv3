module.exports = {
    ITINERARY_SIZE: 7,
    ORIGINS_YELP: 'yelp',
    ORIGINS_EB: 'eventbrite',
    ORIGINS_GP: 'places',
    ORIGINS_MU: 'meetup',
    ORIGINS_SG: 'seatgeek',
    ORIGINS_NONE: 'noneitem',
    ORIGINS_USER: 'useradded',
    // keys/fields in the itinerary object
    EVENTKEYS: [
        'Event1',
        'Breakfast',
        'Event2',
        'Lunch',
        'Event3',
        'Dinner',
        'Event4',
    ],
    // api keys are the keys/fields in the apiData object
    APIKEYS: [
        'eventbriteGlobal',
        'googlePlacesGlobal',
        'meetupItemsGlobal',
        'seatgeekItemsGlobal',
        'yelpBreakfastItemsGlobal',
        'yelpLunchItemsGlobal',
        'yelpDinnerItemsGlobal',
        // 'yelpEventsGlobal', //currently commented because not using yelpevents
    ],
    NUM_RESULTS_PER_PAGE: 6,
    NONE_ITEM_EVENT: {
        name: "None/Free Itinerary Slot",
        cost: 0,
        rating: 10.4,
        time: "9999",
        location: {},
        origin: 'noneitem',
        other: 0, //a field for misc info
      },
    NONE_ITEM: {
        name: "None/Free Itinerary Slot",
        cost: 0,
        rating: 4.0,
        time: "9999",
        location: {},
        origin: 'noneitem',
        other: 0,
      },
    EVENT_TIMES: ["0900","","1200","","1800","","2200"],
    USERADDED_EVENT_RATING: 1000, //
    USERADDED_MEAL_RATING: 1000, //
    AUTO_LOCK_UPDATED_EVENT: true,  // If you want to lock the event if the user updates the cost, set this flag to true
    EMPTY_ITINERARY: {
        name: "No itinerary found. Try changing the inputs.",
        url: "",
        rating: 0,
        time: "",
        location: {},
        cost: 0,
      },
      EMPTY_ITINERARY_NONAME: {
        name: "",
        url: "",
        rating: 0,
        time: "",
        location: {},
        cost: 0,
      },
      NO_ITINERARIES_FOUND_TEXT: ["Oops! No itinerary was found with these inputs."],
      EXCEEDED_BUDGET_TEXT: ["The total cost exceeds your max budget!"],
      LESS_THAN_MINBUDGET_TEXT: ["The total cost is less than your minimum budget!"],
      LOCKED_EVENT_EXCEEDS_BUDGET: ["At least one of your locked events exceeds your max budget!"],
      NUM_EVENT_APIS: 4, // in userinput for filtering results on event api
      FILTER_NAMES: ["Meetup", "Eventbrite", "Seatgeek", "Local Parks"],
      FILTER_DESC: [
        "Meetup brings people together to create thriving communities.",
        "Eventbrite brings people together through live experiences. Discover events that match your passions, or create your own with online ticketing tools.",
        "SeatGeek is the Web's largest event ticket search engine. Discover events you love, search all ticket sites, see seat locations and get the best deals on tickets.",
        "Local Parks and Places are grabbed from Google Places API, a service to  connect people to places with the power of location awareness."
    ],
    TWENTYFOUR_HOURS: 24 * 60 * 60 * 1000, // in ms

    //adduserEvent.js
    DEFAULT_USER_EVENT_TIME: "09:00",
    // googlemaps.js
    GMAPS_DEFAULT_ZOOM: 12,
    //moreInfoView.js
    MULTI_DAY_EVENT_MSG: "Multiple day event",
    HOURS_TEXT: " hour(s)",
    APPROX_DURATION_MSG: "No end time data found.",
    YELP_LINK_TEXT: "Check out the Yelp page!",
    EB_LINK_TEXT: "Check out the Eventbrite page!",
    MU_LINK_TEXT: "Check out the Meetup page!",
    GP_LINK_TEXT: "More information!",
    SG_LINK_TEXT: "Buy Tickets Now!",
    TODAYDATE: new Date(Date.now()),
    MAX_BUDGET_DEFAULT: 9999.0,
    MIN_BUDGET_DEFAULT: 0.0,
    DEFAULT_SEARCH_RADIUS_MI: 50, //miles
    APPROX_EVENT_COST_STR: "Default cost. Check event link for actual cost.",
    APPROX_YELPRESTAURANT_COST_STR: "Default meal cost. Enter desired price.",
    LOCATION_TOOLTIP_STR: "Enter an city, address, or zip code that you want to explore!",
    MIN_TOOLTIP_STR: "Enter your minimum budget here or leave it blank.",
    MAX_TOOLTIP_STR: "Enter your maximum budget here or leave it blank.",
    GO_TOOLTIP_STR: "Get started planning your day!",
    EDITCOST_TOOLTIP_STR: "Edit cost.",
    LOCK_TOOLTIP_STR: "Like this event? Lock it to keep it in your itinerary.",
    X_TOOLTIP_STR: "Remove this item from your itinerary.",
    EMAIL_TOOLTIP_STR: "Email this itinerary to yourself.",
    SEARCHAGAIN_TOOLTIP_STR: "Auto populate unlocked itinerary slots with new events!",
    ADDTOITIN_TOOLTIP_STR: "Add this event to your itinerary.",
    MOREINFO_TOOLTIP_STR: "More info.",
    LESSINFO_TOOLTIP_STR: "Less info.",
    DEFAULT_MIN_PRICE_4_DISPLAY: 0,
    DEFAULT_MAX_PRICE_4_DISPLAY: 10000000,
    DEFAULT_MIN_TIME_4_DISPLAY: 0,
    DEFAULT_MAX_TIME_4_DISPLAY: 3000,
    NUM_OF_EVENT_APIS: 4, //currently meetup, seatgeek, eventbrite, google places
    NUM_OF_EVENT_SLOTS: 4, // event 1 - event4
    NAV_EVENT_TAB_ID: "nav-events-tab",
    NAV_FOOD_TAB_ID: "nav-food-tab",
    NAV_USER_TAB_ID: "nav-add-tab",
    RADIUS_FILTER_STR: "Choose search radius",
    START_TIME_FILTER_SUB_HEADER: 'Start Time',
    END_TIME_FILTER_SUB_HEADER: 'End Time',
    PRIMARY_COLOR: '#3f51b5',
    DEFAULT_PRICEFILTER_MIN: 0,
    DEFAULT_PRICEFILTER_MAX: 500,
    PRICE_FILTER_STEP: 5,
    DEFAULT_TIMEFILTER_MIN: 0,
    DEFAULT_TIMEFILTER_MAX: 2400,
    ABS_TIMEFILTER_MIN:0,
    ABS_TIMEFILTER_MAX:2400,
    NOON: 1200,
    TIME_FILTER_STEP: 100,
    NOTIF_DISMISS_TIME_MS: 1500, //ms
}
