import CButton from '@/components/CButton'
import { Group } from 'react-konva'
import Lotto100Scratch from './Lotto100Scratch'

function LottoGame100() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
          <Lotto100Scratch/>
    </Group>
  )
}

export default LottoGame100