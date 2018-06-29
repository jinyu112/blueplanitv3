module.exports = {
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

}