import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';

import { TIMER_IDLE } from '../constants';
import { toggleFilter } from '../actions';
import Clock from './Clock';
import ButtonGroup from './ButtonGroup';
import ToggleButton from './ToggleButton';

const IdleClock = () => <span>--:--</span>;

const PageHeader = ({
  timer, toggleFilter, showCritical, showActive, showDone,
}) => (
  <>
    <Grid.Row>
      <Grid.Column width={8}>
        <ButtonGroup className="grow filter-buttons">
          <ToggleButton
            onToggle={() => toggleFilter('critical')}
            classOn="red"
            label="Critical"
            on={showCritical}
          />
          <ToggleButton
            onToggle={() => toggleFilter('active')}
            classOn="purple"
            label="Active"
            on={showActive}
          />
          <ToggleButton
            onToggle={() => toggleFilter('done')}
            classOn="purple"
            label="Done"
            on={showDone}
          />
        </ButtonGroup>
      </Grid.Column>
      <Grid.Column width={8}>
        {
          timer.status === TIMER_IDLE ? <IdleClock /> : <Clock />
        }
      </Grid.Column>
    </Grid.Row>
  </>
);

const mapStateToProps = (state) => ({
  timer: state.timer,
  showCritical: state.filters.critical,
  showActive: state.filters.active,
  showDone: state.filters.done,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFilter: (key) => dispatch(toggleFilter(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
