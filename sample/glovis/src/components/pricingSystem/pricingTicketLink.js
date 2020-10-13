/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PricingTicketLink = ({ children }) => {
  return <Link href={'/event/eventList'}>{children}</Link>;
};

PricingTicketLink.prototype = {
  children: PropTypes.any
};

export default PricingTicketLink;
