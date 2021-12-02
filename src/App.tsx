import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { NavigationBar } from './layout/navigation-menu/NavigationBar';
import './App.css';
import { Footer } from './layout/footer/Footer';
import { About } from './features/about/About';
import { ListeFichesTechniquesPage } from './features/fichestechniques/ListeFichesTechniquesPage';
import { MercurialPage } from './features/mercurial/MercurialPage';
import { ListeAllergenesPage } from './features/mercurial/ListeAllergenesPage';
import { ListeIngredientsParCategorie } from './features/mercurial/liste-ingredients/ListeIngredientsParCategorie';
import { ListeAllergenesParCategorie } from './features/mercurial/liste-allergenes/ListeAllergenesParCategorie';
import { Dashbord } from './components/dashbord/Dashbord';
import { DetailIngredient } from './features/mercurial/detail/DetailIngredient';
import { FicheTechniqueCategory } from './features/fichestechniques/categorie/FicheTechniqueCategory';
import { CreateFicheTechnique } from './features/fichestechniques/creer/CreateFicheTechnique';
import { CreatePhase } from './features/fichestechniques/phase/creer/CreatePhase';
import { CreateIngredient } from './features/mercurial/create/CreateIngredient';
import { FicheTechniqueDetail } from './features/fichestechniques/detail/FicheTechniqueDetail';
import { StockMenu } from './features/stocks/StockMenu';
import { IngredientResearch } from './features/mercurial/search/IngredientResearch';
import { FTResearch } from './features/fichestechniques/search/FTResearch';

function App(): JSX.Element {
  const [style, setStyle] = useState({});
  
  useEffect(() => {
    setStyle({
      paddingTop: '70px',
    });
  },[]);

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
            '/fiches techniques/search/:word',
            '/fiches techniques/search/:word/byCategorie/:id_categorie_fiche',
            '/fiches techniques/byCategorie/:id_categorie_fiche',
            '/fiches techniques/details/:id_fiche_technique',
            //phases
            '/phases/create',
            //mercurial
            '/mercurial',
            '/mercurial/create',
            '/mercurial/search/:word',
            '/mercurial/search/:word/byCategorie/:id_categorie',
            '/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene',
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
            '/fiches techniques/search/:word',
            '/fiches techniques/search/:word/byCategorie/:id_categorie_fiche',
            '/fiches techniques/byCategorie/:id_categorie_fiche',
            '/fiches techniques/details/:id_fiche_technique',
            //phases
            '/phases/create',
            //mercurial
            '/mercurial',
            '/mercurial/create',
            '/mercurial/search/:word',
            '/mercurial/search/:word/byCategorie/:id_categorie',
            '/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene',
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
          <div className="App-content">
            <Route exact path="/accueil">
              <Dashbord />
            </Route>
            <Route exact path="/about" component={About} />
            <Route exact path="/liste des allergenes" component={ListeAllergenesPage} />
            <Route exact path="/fiches techniques" component={ListeFichesTechniquesPage} />
            <Route exact path="/fiches techniques/create" component={CreateFicheTechnique} />
            <Route exact path="/fiches techniques/search/:word" component={FTResearch} />
            <Route exact path="/fiches techniques/search/:word/byCategorie/:id_categorie_fiche" component={FTResearch} />
            <Route exact path="/phases/create" component={CreatePhase} />
            <Route exact path="/fiches techniques/byCategorie/:id_categorie_fiche" component={FicheTechniqueCategory} />
            <Route exact path="/fiches techniques/details/:id_fiche_technique" component={FicheTechniqueDetail} />
            <Route exact path="/mercurial" component={MercurialPage} />
            <Route exact path="/mercurial/byCategorie/:id_categorie" component={ListeIngredientsParCategorie} />
            <Route exact path="/liste des allergenes/byCategorie/:id_categorie_allergene" component={ListeAllergenesParCategorie} />
            <Route exact path="/mercurial/create" component={CreateIngredient} />
            <Route exact path="/mercurial/search/:word" component={IngredientResearch} />
            <Route exact path="/mercurial/search/:word/byCategorie/:id_categorie" component={IngredientResearch} />
            <Route exact path="/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene" component={IngredientResearch} />
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
              '/fiches techniques/search/:word',
              '/fiches techniques/search/:word/byCategorie/:id_categorie_fiche',
              '/fiches techniques/byCategorie/:id_categorie_fiche',
              '/fiches techniques/details/:id_fiche_technique',
              //phases
              '/phases/create',
              //mercurial
              '/mercurial',
              '/mercurial/create',
              '/mercurial/search/:word',
              '/mercurial/search/:word/byCategorie/:id_categorie',
              '/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene',
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
