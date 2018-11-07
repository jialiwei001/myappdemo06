import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Animal from './animal';
import AnimalDetail from './animal-detail';
import AnimalUpdate from './animal-update';
import AnimalDeleteDialog from './animal-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AnimalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AnimalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AnimalDetail} />
      <ErrorBoundaryRoute path={match.url} component={Animal} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AnimalDeleteDialog} />
  </>
);

export default Routes;
