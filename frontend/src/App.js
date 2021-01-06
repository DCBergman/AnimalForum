import Subforum from './components/Subforum';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ForumContextProvider from './context/ForumContextProvider';
import ThreadsList from './pages/ThreadsList';
import ThreadPage from './pages/ThreadPage';
import Header from './components/Header';
import RegisterAccount from './pages/RegisterAccount'; 
import LoginPage from './pages/LoginPage'; 

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
              <Route exact path="/threads/:subforumId/:threadId" component={ThreadPage} />
              <Route exact path="/register" component={RegisterAccount} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </main>
        </ForumContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
