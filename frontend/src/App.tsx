import './App.css'
import { PlusIcon } from './assets/icons/PlusIcon'
import { ShareIcon } from './assets/icons/ShareIcon'
import { Button } from './components/Button'
import {Card} from './components/Card'

function App(){
  return <div >
    <Button varient='primary' text='Add Content' startIcon={< PlusIcon />}/>
    <Button varient='secondary' text='Share Brain' startIcon={< ShareIcon />} />

    <Card />
  </div>
}


export default App
