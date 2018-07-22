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
    NUM_RESULTS_PER_PAGE: 10,
    NONE_ITEM_EVENT: {
        name: "None/Free Itinerary Slot",
        cost: 0,
        rating: 10.4,
        time: "9999",
        location: {},
        origin: 'noneitem',
      },
    NONE_ITEM: {
        name: "None/Free Itinerary Slot",
        cost: 0,
        rating: 4.0,
        time: "9999",
        location: {},
        origin: 'noneitem',
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
}
