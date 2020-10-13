import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import CarFilter from '@src/components/common/CarFilter';
import { SECTION_BUY } from '@src/actions/types';

const filter = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  return (
    <AppLayout>
      <CarFilter />
    </AppLayout>
  )
}

export default filter
