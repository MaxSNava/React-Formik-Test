import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'

export default function App() {
  return (
    <>
      <h1 className='text-center text-2xl font-bold'>Item Management</h1>
      <ItemForm />
      <ItemList/>
    </>
  )
}
