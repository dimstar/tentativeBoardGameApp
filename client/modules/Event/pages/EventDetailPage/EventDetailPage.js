import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import HostEditingInterface from '../../components/HostEditingInterface/';

// Import Style
import styles from '../../components/EventListItem/EventListItem.css';

// Import Actions
import { fetchEvent } from '../../EventActions';

// Import Selectors
import { getEvent } from '../../EventReducer';

export function EventDetailPage(props) {
  // TODO: Refactor this later. Currently this code exists to keep there from being an error
  // after event deletion (it attempts to do work on null code)
  if (props.event) {
    console.log('Found dispatch ', props.dispatch);
    console.log(props.event);
  }

  const numAttendees = () => {
    return props.event.attendees.length;
  };

  const isFull = () => {
    if (props.event.slots - numAttendees() <= 0) {
      return true;
    }
    return false;
  };

  const addAttendee = (id) => {
    // Return a function, probably
  };

  const ifUserOwns = (id) => {
    return (id === props.user);
  };

  return (
    <div>
      {props.event ?
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <Helmet title={props.event.eventName} />
          <h3 className={styles['post-title']}>{props.event.eventName}</h3>
          {/* <p className={styles['author-name']}>by {props.event.owner}</p> */}
          <p className={styles['post-desc']}>{props.event.notes}</p>

          <p className={styles['post-desc']}>
            {props.event.address}
          </p>
          <p className={styles['post-desc']}>
            {`${props.event.city}, ${props.event.state} ${props.event.zipcode}`}
          </p>
          <p className={styles['post-desc']}>{props.event.scheduledDate}</p>
          <p className={styles['post-desc']}>{props.event.scheduledTime}</p>
          <p className={styles['post-desc']}>
          </p>
        {
          ifUserOwns(props.event.owner)
          ?
            <HostEditingInterface
              event={props.event}
              dispatch={props.dispatch}
            />
          :
          isFUll()
            ? ''
            :
            <div>
            (`${numAttendees} / ${props.event.slots}`)
              <a className="waves-effect waves-light btn" onClick={addAttendee}>JOIN</a>
            </div>
          }
        </div>
      :
        <div>
          Your event no longer exists.
        </div>
        }
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
EventDetailPage.need = [(params) => {
  return fetchEvent(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    event: getEvent(state, props.params.cuid),
    user: state.authUser.data[0].uid,
  };
}

EventDetailPage.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    gameType: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
    scheduledDate: PropTypes.string.isRequired,
    scheduledTime: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    slots: PropTypes.number.isRequired,
  }),
};

export default connect(mapStateToProps)(EventDetailPage);
