import Subforum from './components/Subforum';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ForumContextProvider from './context/ForumContextProvider';
import ThreadsList from './pages/ThreadsList';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ForumContextProvider>
          <main className="container">
            <Header/>
            <Switch>
              <Route exact path="/" component={Subforum} />
              <Route exact path="/threads/:subforumId" component={ThreadsList} />
            </Switch>
          </main>
        </ForumContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
