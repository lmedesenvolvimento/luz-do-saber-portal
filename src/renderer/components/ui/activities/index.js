import BeginActivities from '@ui/activities/begin';
import ReadActivities from '@ui/activities/read'

export default {
    'ls-activity-default': require('./Default.vue').default,
    'ls-activity-box-of-words': require('./BoxOfWords.vue').default,
    ...BeginActivities,
    ...ReadActivities
}
