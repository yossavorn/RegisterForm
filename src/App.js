import RegisterForm from './components/RegisterForm';
import { useSearchParams } from 'react-router-dom';

function App() {

  const [search, setSearch] = useSearchParams();
  const emailParam = search.get('email')
  const refParam = search.get('ref')
  
  return (
    <div className="app">
      <RegisterForm />
    </div>
  );
}

export default App;
