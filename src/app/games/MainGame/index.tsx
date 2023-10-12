import BalanceBar from '@/components/BalanceBar';
import CButton from '@/components/CButton';
import { CanvasProvider } from '@/components/CanvasContext';
import ImageFlip from '@/components/ImageFlip';
import React from 'react';
import { Group } from 'react-konva';

function MainGames() {
  const { isCanvasSize } = React.useContext(CanvasProvider);
  const { height, width } = isCanvasSize;
    return (
      <Group>
        <BalanceBar balance_amount={12525222} time_played={152} />
        <ImageFlip />
        <CButton />
      </Group>
    );
}

export default MainGames