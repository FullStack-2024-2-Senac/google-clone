import axios from 'axios';

const API_KEY = 'ieuroiroiewuoriwu';  //informe sua chave de API

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try{
      const response = await axios.get('https://serpapi.com/search.json',{
        params: {
          q: query,
          engine: 'google',
          api_key: API_KEY,
          num: 10 //retorna os 10 primeiros resultados
        },
      });
      console.log('Resposta da API: ', response.data);
      setResults(response.data.organic_results || []);
      setLoading(false);
    }
    catch (err)
    {
      if (err.response){
        console.error('Erro na resposta da API ', err.response.data);
        setError(`Erro: ${err.response.data.error || 'Ocorreu um erro na busca' }`);
      }
      else if (err.request){
        console.error('Erro na requisição, sem resposta ', err.request);
        setError('Erro: Sem resposta da API. Verifique sua conexão ou tente mais tarde');
      }
      else {
        console.error('Erro desconhecido', err.message);
        setError(`Erro: ${err.message}`);
      }
      setLoading(false);
    }   
  
};

return(
  <div className='App'>
    <h1>Google Search Clone - SerpAPI</h1>
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite sua busca..."
        />
        <button onClick={handleSearch}>Pesquisar</button>
    </div>
  </div>

  {loading && <p>Carregando...</p>}
  {error && <p>{error}</p>}
  



);

}


export default App;
