import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { NavigationBar } from './layout/navigation-menu/NavigationBar';
import './App.css';
import { ProfilePage } from './features/profile/ProfilePage';
import { Footer } from './layout/footer/Footer';
import { LoginPage } from './features/login/LoginPage';
import { About } from './features/about/About';
import { ListeFichesTechniquesPage } from './features/fichestechniques/ListeFichesTechniquesPage';
import { MercurialPage } from './features/mercurial/MercurialPage';
import { ListeAllergenesPage } from './features/mercurial/ListeAllergenesPage';

function App(): JSX.Element {
  const [style, setStyle] = useState({
    paddingTop: '70px',
  });

  return (
    <div className="App" style={style}>
      <Router>
        <Route exact path="/">
          {
            !!1 ? 
              <Redirect to="accueil" />
            :
              <Redirect to="login" />
          }
        </Route>
        <Route
          exact
          path={[
            '/',
            '/accueil',
            '/fiches techniques',
            '/mercurial',
            '/liste des allergenes',
            '/policies',
            '/about'
          ]}
          component={NavigationBar}
        />
        <Route
          exact
          path={[
            '/',
            '/accueil',
            '/fiches techniques',
            '/mercurial',
            '/liste des allergenes',
            '/policies',
            '/about',
            '/login'
          ]}
        >
          <div className="App-content">
            <Route exact path="/accueil">
              <h1>AWI PROJECT</h1>
              <h3>First test app.</h3>
            </Route>
            <Route exact path="/about" component={About} />
            <Route 
              exact 
              path="/login" 
              render={() =>
                !!1 ? (
                  <LoginPage />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/accueil',
                    }}
                  />
                )
              }
            />
            <Route exact path="/liste des allergenes" component={ListeAllergenesPage} />
            <Route exact path="/fiches techniques" component={ListeFichesTechniquesPage} />
            <Route exact path="/mercurial" component={MercurialPage} />
          </div>
          <Route 
            exact 
            path={[
              '/',
              '/accueil',
              '/fiches techniques',
              '/mercurial',
              '/liste des allergenes',
              '/policies',
              '/about'
            ]}
          >
            <div className="App-footer">
              <Footer />
            </div>
          </Route>
        </Route>
      </Router>
    </div>
  );
}

export default App;
