import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import CarFilter from '@src/components/common/car/buyCar/CarFilter';
import { SECTION_BUY } from '@src/actions/types';

const filter = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  return (
    <AppLayout>
      <CarFilter />
    </AppLayout>
  )
}

export default filter
