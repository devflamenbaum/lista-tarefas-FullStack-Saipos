import React from 'react';
import PropTypes from 'prop-types';
// import Box from '@material-ui/core/Box';
import styled from 'styled-components';

function TabPanel({ children, value, index }) {
  return (
    <CustomTabPanel role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </CustomTabPanel>
  );
}

const CustomTabPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
`;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;
