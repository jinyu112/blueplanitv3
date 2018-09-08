import React from 'react';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui-slider-label/Slider';
import CONSTANTS from '../constants.js';

const styles = {
  subheader: {
    textTransform: 'capitalize',
    lineHeight: '20px',
  },
  labelStyleOuter: {
    width: '60px',
    height: '20px',
    borderRadius: '10px',
    background: '#3f51b5',
    position: 'absolute',
    top: '20px',
    left: '-29px',
  },
  labelStyleInner: {
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '3px',
    right: '0px',
    fontSize: '10px',
  },
  slider: {
      marginBottom: '30px'
  }
};

const EndSlider = ({minValue, endTimeDisplay, endTime, onChange }) => (
  <div>
    <Subheader style={styles.subheader}>
      {CONSTANTS.END_TIME_FILTER_SUB_HEADER}
    </Subheader>
    <Slider
      style={styles.slider}
      id="endTime"
      defaultValue={1}
      min={0}
      max={24}
      step={1}
      value={endTime}
      onChange={onChange}
      label={
        <div style={styles.labelStyleOuter}>
          <div style={styles.labelStyleInner}>
            {endTimeDisplay}
          </div>
        </div>
      }
    />
  </div>
);

export default EndSlider;
