import BeginActivities from '@ui/activities/begin';

export default {
    'ls-activity-default': require('./Default.vue').default,
    'ls-activity-box-of-words': require('./BoxOfWords.vue').default,
    ...BeginActivities
}