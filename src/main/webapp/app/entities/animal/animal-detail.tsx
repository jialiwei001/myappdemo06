import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './animal.reducer';
import { IAnimal } from 'app/shared/model/animal.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnimalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AnimalDetail extends React.Component<IAnimalDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { animalEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Animal [<b>{animalEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{animalEntity.name}</dd>
            <dt>
              <span id="variety">Variety</span>
            </dt>
            <dd>{animalEntity.variety}</dd>
            <dt>
              <span id="price">Price</span>
            </dt>
            <dd>{animalEntity.price}</dd>
            <dt>
              <span id="age">Age</span>
            </dt>
            <dd>{animalEntity.age}</dd>
          </dl>
          <Button tag={Link} to="/entity/animal" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/animal/${animalEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ animal }: IRootState) => ({
  animalEntity: animal.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalDetail);
