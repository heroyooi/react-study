import { useState, useEffect, createElement, useMemo } from 'react';

const ColGroup = ({ cols = [] }) => {
  return cols?.length ?
    <colgroup>
      {
        cols.map((col, i) =>
          <col width={col} key={i} />
        )
      }
    </colgroup>
  :
    <></>
};
export default ColGroup;
