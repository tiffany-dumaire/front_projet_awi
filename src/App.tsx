import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { NavigationBar } from './layout/navigation-menu/NavigationBar';
import './App.css';
import { Footer } from './layout/footer/Footer';
import { LoginPage } from './features/login/LoginPage';
import { About } from './features/about/About';
import { ListeFichesTechniquesPage } from './features/fichestechniques/ListeFichesTechniquesPage';
import { MercurialPage } from './features/mercurial/MercurialPage';
import { ListeAllergenesPage } from './features/mercurial/ListeAllergenesPage';
import { ListeIngredientsParCategorie } from './features/mercurial/liste-ingredients/ListeIngredientsParCategorie';
import { ListeAllergenesParCategorie } from './features/mercurial/liste-allergenes/ListeAllergenesParCategorie';
import { Dashbord } from './components/dashbord/Dashbord';
import { DetailIngredient } from './features/detail/DetailIngredient';
import { FicheTechniqueCategory } from './features/fichestechniques/categorie/FicheTechniqueCategory';
import { CreateFicheTechnique } from './features/fichestechniques/creer/CreateFicheTechnique';
import { CreatePhase } from './features/fichestechniques/phase/creer/CreatePhase';
import { CreateIngredient } from './features/mercurial/create/CreateIngredient';
import { FicheTechniqueDetail } from './features/fichestechniques/detail/FicheTechniqueDetail';
import { StockMenu } from './features/stocks/StockMenu';

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
            //accueil
            '/',
            '/accueil',
            //fiches techniques
            '/fiches techniques',
            '/fiches techniques/create',
            '/fiches techniques/byCategorie/:id_categorie_fiche',
            '/fiches techniques/details/:id_fiche_technique',
            //phases
            '/phases/create',
            //mercurial
            '/mercurial',
            '/mercurial/create',
            '/mercurial/byCategorie/:id_categorie',
            '/mercurial/ingredient/:id_ingredient',
            //liste des allergenes
            '/liste des allergenes',
            '/liste des allergenes/byCategorie/:id_categorie_allergene',
            //gestion des stocks
            '/stocks',
            //other
            '/policies',
            '/about',
          ]}
          component={NavigationBar}
        />
        <Route
          exact
          path={[
            //accueil
            '/',
            '/accueil',
            //fiches techniques
            '/fiches techniques',
            '/fiches techniques/create',
            '/fiches techniques/byCategorie/:id_categorie_fiche',
            '/fiches techniques/details/:id_fiche_technique',
            //phases
            '/phases/create',
            //mercurial
            '/mercurial',
            '/mercurial/create',
            '/mercurial/byCategorie/:id_categorie',
            '/mercurial/ingredient/:id_ingredient',
            //liste des allergenes
            '/liste des allergenes',
            '/liste des allergenes/byCategorie/:id_categorie_allergene',
            //gestion des stocks
            '/stocks',
            //other
            '/policies',
            '/about',
            '/login'
          ]}
        >
          <div className="App-content">
            <Route exact path="/accueil">
              <Dashbord />
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
            <Route exact path="/fiches techniques/create" component={CreateFicheTechnique} />
            <Route exact path="/phases/create" component={CreatePhase} />
            <Route exact path="/fiches techniques/byCategorie/:id_categorie_fiche" component={FicheTechniqueCategory} />
            <Route exact path="/fiches techniques/details/:id_fiche_technique" component={FicheTechniqueDetail} />
            <Route exact path="/mercurial" component={MercurialPage} />
            <Route exact path="/mercurial/byCategorie/:id_categorie" component={ListeIngredientsParCategorie} />
            <Route exact path="/liste des allergenes/byCategorie/:id_categorie_allergene" component={ListeAllergenesParCategorie} />
            <Route exact path="/mercurial/create" component={CreateIngredient} />
            <Route exact path='/mercurial/ingredient/:id_ingredient' component={DetailIngredient} />
            <Route exact path='/stocks' component={StockMenu} />
          </div>
          <Route 
            exact 
            path={[
              //accueil
              '/',
              '/accueil',
              //fiches techniques
              '/fiches techniques',
              '/fiches techniques/create',
              '/fiches techniques/byCategorie/:id_categorie_fiche',
              '/fiches techniques/details/:id_fiche_technique',
              //phases
              '/phases/create',
              //mercurial
              '/mercurial',
              '/mercurial/create',
              '/mercurial/byCategorie/:id_categorie',
              '/mercurial/ingredient/:id_ingredient',
              //liste des allergenes
              '/liste des allergenes',
              '/liste des allergenes/byCategorie/:id_categorie_allergene',
              //gestion des stocks
              '/stocks',
              //other
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
