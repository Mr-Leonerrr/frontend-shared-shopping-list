import ListContainer from './components/lists/ListContainer'

function App() {
    return (
      <div>
        <div className="max-w-3xl mx-auto mt-8 px-4">
          <h1 className="text-2xl font-bold mb-4">🛒 Listas de Compras</h1>
          <ListContainer />
        </div>
      </div>
    );
}

export default App
