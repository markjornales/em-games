import BalanceBar from '@/components/BalanceBar';
import CButton from '@/components/CButton';
import { CanvasProvider } from '@/components/CanvasContext';
import ImageFlip from '@/components/ImageFlip'; 
import React from 'react';
import { Group } from 'react-konva';
import ScratchGames from './ScratchGames';
import WarningModal from '@/components/WarningModal';

function MainGames() {
  const { isCanvasSize } = React.useContext(CanvasProvider);
  const { height, width } = isCanvasSize;
  const [isScratch, setScratch] = React.useState<boolean>(false);

  const onclickStarts = () => {
    setScratch(true);
  }

    return (
      <Group>
        <BalanceBar balance_amount={12525222} time_played={152} />
        {isScratch? <ScratchGames/>: <ImageFlip />}
        <CButton label={isScratch? "NEXT CARD": ""} onclickStart={onclickStarts} />
        <WarningModal/>
      </Group>
    );
}

export default MainGames