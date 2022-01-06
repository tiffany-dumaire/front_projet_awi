import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
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
//import { FicheTechniqueDetail } from './features/fichestechniques/detail/FicheTechniqueDetail';
import { StockMenu } from './features/stocks/StockMenu';
import { IngredientResearch } from './features/mercurial/search/IngredientResearch';
import { FTResearch } from './features/fichestechniques/search/FTResearch';
import { PhaseView } from './features/fichestechniques/phase/view/PhaseView';
import { ModifyPhase } from './features/fichestechniques/phase/modifier/ModifyPhase';
import { StockEntriesChoice } from './features/stocks/entrees/StockEntriesChoice';
import { AllStockEntries } from './features/stocks/entrees/all/AllStockEntries';
import { CategoryStockEntries } from './features/stocks/entrees/category/CategoryStockEntries';
import { Parameters } from './features/parameter/Parameters';
import { NotFound } from './features/notfound/NotFound';
import { ListePhasesPage } from './features/fichestechniques/phase/ListePhases';
import { ModifyCategoryIngredient } from './features/mercurial/category/ModifyCategoryIngredient';
import { ModifyCategoryAllergene } from './features/mercurial/category-allergene/ModifyCategoryAllergene';
import { ModifyCategoryFiche } from './features/fichestechniques/categorie/modify/ModifyCategoryFiche';
import { VenteTest } from './features/stocks/ventes/tests/VenteTest';
import { FicheTechniqueDetail2 } from './features/fichestechniques/view/FicheTechniqueDetail2';
import { ModifyFicheTechnique } from './features/fichestechniques/modify/ModifyFicheTechnique';
import { Vente } from './features/stocks/ventes/sorties/Vente';

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
            '/fiches techniques/modify/:id_fiche_technique',
            '/fiches techniques/search/:word',
            '/fiches techniques/search/:word/byCategorie/:id_categorie_fiche',
            '/fiches techniques/byCategorie/:id_categorie_fiche',
            '/fiches techniques/details/:id_fiche_technique',
            //categoryFiche
            '/category/fiche_technique/modify/:id_categorie_fiche',
            //phases
            '/phases',
            '/phases/create',
            '/phases/view/:id_phase',
            '/phases/modify/:id_phase',
            //mercurial
            '/mercurial',
            '/mercurial/create',
            '/mercurial/search/:word',
            '/mercurial/search/:word/byCategorie/:id_categorie',
            '/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene',
            '/mercurial/byCategorie/:id_categorie',
            '/mercurial/ingredient/:id_ingredient',
            //categoryMercurial
            '/category/ingredient/modify/:id_categorie',
            //liste des allergenes
            '/liste des allergenes',
            '/liste des allergenes/byCategorie/:id_categorie_allergene',
            //categoryAllergene
            '/category/allergene/modify/:id_categorie_allergene',
            //gestion des stocks
            '/stocks',
            '/stocks/entrees',
            '/stocks/entrees/all',
            '/stocks/entrees/byCategorie',
            '/stocks/entrees/byList',
            '/stocks/ventes/test',
            '/stocks/ventes/sorties',
            //other
            '/parameters',
            '/about',
          ]}
          component={NavigationBar}
        />
        <Switch>
          <Route
            exact
            path={[
              //accueil
              '/',
              '/accueil',
              //fiches techniques
              '/fiches techniques',
              '/fiches techniques/create',
              '/fiches techniques/modify/:id_fiche_technique',
              '/fiches techniques/search/:word',
              '/fiches techniques/search/:word/byCategorie/:id_categorie_fiche',
              '/fiches techniques/byCategorie/:id_categorie_fiche',
              '/fiches techniques/details/:id_fiche_technique',
              //categoryFiche
              '/category/fiche_technique/modify/:id_categorie_fiche',
              //phases
              '/phases',
              '/phases/create',
              '/phases/view/:id_phase',
              '/phases/modify/:id_phase',
              //mercurial
              '/mercurial',
              '/mercurial/create',
              '/mercurial/search/:word',
              '/mercurial/search/:word/byCategorie/:id_categorie',
              '/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene',
              '/mercurial/byCategorie/:id_categorie',
              '/mercurial/ingredient/:id_ingredient',
              //categoryMercurial
              '/category/ingredient/modify/:id_categorie',
              //liste des allergenes
              '/liste des allergenes',
              '/liste des allergenes/byCategorie/:id_categorie_allergene',
              //categoryAllergene
              '/category/allergene/modify/:id_categorie_allergene',
              //gestion des stocks
              '/stocks',
              '/stocks/entrees',
              '/stocks/entrees/all',
              '/stocks/entrees/byCategorie',
              '/stocks/entrees/byList',
              '/stocks/ventes/test',
              '/stocks/ventes/sorties',
              //other
              '/parameters',
              '/about'
            ]}
          >
            <div className="App-content">
                {/*accueil*/}
                <Route exact path="/accueil">
                  <Dashbord />
                </Route>
                {/*fiches techniques*/}
                <Route exact path="/fiches techniques" component={ListeFichesTechniquesPage} />
                <Route exact path="/fiches techniques/create" component={CreateFicheTechnique} />
                <Route exact path="/fiches techniques/modify/:id_fiche_technique" component={ModifyFicheTechnique} />
                <Route exact path="/fiches techniques/search/:word" component={FTResearch} />
                <Route exact path="/fiches techniques/search/:word/byCategorie/:id_categorie_fiche" component={FTResearch} />
                <Route exact path="/fiches techniques/byCategorie/:id_categorie_fiche" component={FicheTechniqueCategory} />
                <Route exact path="/fiches techniques/details/:id_fiche_technique" component={FicheTechniqueDetail2} />
                {/*categoryFiche*/}
                <Route exact path="/category/fiche_technique/modify/:id_categorie_fiche" component={ModifyCategoryFiche} />
                {/*phases*/}
                <Route exact path="/phases" component={ListePhasesPage} />
                <Route exact path="/phases/create" component={CreatePhase} />
                <Route exact path="/phases/view/:id_phase" component={PhaseView} />
                <Route exact path="/phases/modify/:id_phase" component={ModifyPhase} />
                {/*mercurial*/}
                <Route exact path="/mercurial" component={MercurialPage} />
                <Route exact path="/mercurial/create" component={CreateIngredient} />          
                <Route exact path="/mercurial/search/:word" component={IngredientResearch} />
                <Route exact path="/mercurial/search/:word/byCategorie/:id_categorie" component={IngredientResearch} />
                <Route exact path="/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene" component={IngredientResearch} />
                <Route exact path="/mercurial/byCategorie/:id_categorie" component={ListeIngredientsParCategorie} />
                <Route exact path="/mercurial/ingredient/:id_ingredient" component={DetailIngredient} />
                {/*categoryMercurial*/}
                <Route exact path="/category/ingredient/modify/:id_categorie" component={ModifyCategoryIngredient} />
                {/*liste des allergenes*/}
                <Route exact path="/liste des allergenes" component={ListeAllergenesPage} />
                <Route exact path="/liste des allergenes/byCategorie/:id_categorie_allergene" component={ListeAllergenesParCategorie} />
                {/*categoryAllergene*/}
                <Route exact path="/category/allergene/modify/:id_categorie_allergene" component={ModifyCategoryAllergene} />
                {/*gestion des stocks*/}
                <Route exact path="/stocks" component={StockMenu} />
                <Route exact path="/stocks/entrees" component={StockEntriesChoice} />
                <Route exact path="/stocks/entrees/all" component={AllStockEntries} />
                <Route exact path="/stocks/entrees/byCategorie" component={CategoryStockEntries} />
                <Route exact path="/stocks/entrees/byList" component={StockMenu} />
                <Route exact path="/stocks/ventes/test" component={VenteTest} />
                <Route exact path="/stocks/ventes/sorties" component={Vente} />
                {/*other*/}
                <Route exact path="/parameters" component={Parameters} />
                <Route exact path="/about" component={About} />
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
                '/fiches techniques/modify/:id_fiche_technique',
                '/fiches techniques/search/:word',
                '/fiches techniques/search/:word/byCategorie/:id_categorie_fiche',
                '/fiches techniques/byCategorie/:id_categorie_fiche',
                '/fiches techniques/details/:id_fiche_technique',
                //categoryFiche
                '/category/fiche_technique/modify/:id_categorie_fiche',
                //phases
                '/phases',
                '/phases/create',
                '/phases/view/:id_phase',
                '/phases/modify/:id_phase',
                //mercurial
                '/mercurial',
                '/mercurial/create',
                '/mercurial/search/:word',
                '/mercurial/search/:word/byCategorie/:id_categorie',
                '/mercurial/search/:word/byCategorieAllergene/:id_categorie_allergene',
                '/mercurial/byCategorie/:id_categorie',
                '/mercurial/ingredient/:id_ingredient',
                //categoryMercurial
                '/category/ingredient/modify/:id_categorie',
                //liste des allergenes
                '/liste des allergenes',
                '/liste des allergenes/byCategorie/:id_categorie_allergene',
                //categoryAllergene
                '/category/allergene/modify/:id_categorie_allergene',
                //gestion des stocks
                '/stocks',
                '/stocks/entrees',
                '/stocks/entrees/all',
                '/stocks/entrees/byCategorie',
                '/stocks/entrees/byList',
                '/stocks/ventes/test',
                '/stocks/ventes/sorties',
                //other
                '/parameters',
                '/about'
              ]}
            >
              <div className="App-footer">
                <Footer />
              </div>
            </Route>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
