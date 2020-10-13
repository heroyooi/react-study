import React, { memo, useEffect, useState } from 'react';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import { mPictureGuideTab3, mPictureGuideTab4 } from '@src/constant/screenInfo';
import MobPhotoGuideList from '@src/components/common/MobPhotoGuideList';

const MobPhotoInfo = memo((mode = 'normal') => {

  const [isShow360, setIsShow360] = useState(true);
  
  useEffect(() => {
    if (mode === 'sellcar' || mode?.mode === 'sellcar') {
      setIsShow360(false);
    }
  }, [mode]);

  if (!isShow360) {
    return (
      <div className="photo-info-wrap">
        <TabMenu type="type2" mount={false}>
          <TabCont tabTitle="촬영안내" id="tab2-1" index={0}>
            <MobPhotoGuideList shootingGuide={true} />
          </TabCont>
          <TabCont tabTitle="차량외부" id="tab2-2" index={1}>
            <MobPhotoGuideList pictureList={mPictureGuideTab3} />
          </TabCont>
          <TabCont tabTitle="차량내부" id="tab2-3" index={2}>
            <MobPhotoGuideList pictureList={mPictureGuideTab4} isAddScratchShot={true} />
          </TabCont>
        </TabMenu>
      </div>
    );
  }

  return (
    <div className="photo-info-wrap">
      <TabMenu type="type2" mount={false}>
        <TabCont tabTitle="촬영안내" id="tab2-1" index={0}>
          <MobPhotoGuideList shootingGuide={true} />
        </TabCont>
        <TabCont tabTitle="360 촬영" id="tab2-2" index={1}>
          <MobPhotoGuideList shooting360={true} />
        </TabCont>
        <TabCont tabTitle="차량외부" id="tab2-3" index={2}>
          <MobPhotoGuideList pictureList={mPictureGuideTab3} />
        </TabCont>
        <TabCont tabTitle="차량내부" id="tab2-4" index={3}>
          <MobPhotoGuideList pictureList={mPictureGuideTab4} isAddScratchShot={true} />
        </TabCont>
      </TabMenu>
    </div>
  );
});

MobPhotoInfo.displayName = 'MobPhotoInfo';
export default MobPhotoInfo;
