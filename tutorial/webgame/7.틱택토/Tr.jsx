import React, { useMemo, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        useMemo(
          () => <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>, // 컴포넌트 자체를 기억
          [rowData[i]],
        )
      ))}
    </tr>
  )
});

export default Tr;