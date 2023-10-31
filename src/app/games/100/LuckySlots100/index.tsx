import CButton from '@/components/CButton'
import { Group } from 'react-konva'
import LuckySlotsScratch from './LuckySlotsScratch'

function LuckySlots100() {
  return (
    <Group>
        <CButton label="NEXT CARD" url_path="hundredcards" onclickStart={() => {}} />
        <LuckySlotsScratch/>
    </Group>
  )
}

export default LuckySlots100