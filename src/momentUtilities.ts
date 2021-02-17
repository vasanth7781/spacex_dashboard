import * as moment from 'moment'
import { isEmpty, not } from 'ramda'

/**
 * formatTimeStamp - will convert the timestamp to the below given format
 * @param date date as timestamp string to convert to the MMM Do YYYY h:mm a
 */
export const formatTimeStamp = (date: any) => {
    if (not(isEmpty(date))) {
        return moment.utc(date).format('MMM Do YYYY h:mm a')
    }
}
