import CarOptions from '@src/components/common/CarOptions';
import CarAddOption from '@src/components/common/CarAddOption';

const CarOption = () => {
  return (
    <>
      <CarOptions title="기본 옵션" type={2} more={false} className="mt80 pt0" />
      <CarAddOption />
    </>
  );
};
export default CarOption;
