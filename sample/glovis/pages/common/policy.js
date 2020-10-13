import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import SelectBox from '@lib/share/items/SelectBox';

const terms = () => {
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <div className="terms-area">        
        <div className="tit-wrap">
          <h3 className="tit">개인정보처리방침</h3>          
          <div className="enforce-wrap">
            <strong>시행일</strong>
            <SelectBox id="select1" className="items-sbox" options={
              [
                { value: '1', label: '2019-11-26' },            
                { value: '2', label: '2019-11-27' }
              ]
            } width={176} height={40} placeHolder="2019-11-26" />
          </div>  
        </div>

        <div className="cont-wrap">
           <p>약관 수급 필요</p> 
        </div>
      </div>
    </AppLayout>
  )
}

export default terms;