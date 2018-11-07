import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAnimal, defaultValue } from 'app/shared/model/animal.model';

export const ACTION_TYPES = {
  SEARCH_ANIMALS: 'animal/SEARCH_ANIMALS',
  FETCH_ANIMAL_LIST: 'animal/FETCH_ANIMAL_LIST',
  FETCH_ANIMAL: 'animal/FETCH_ANIMAL',
  CREATE_ANIMAL: 'animal/CREATE_ANIMAL',
  UPDATE_ANIMAL: 'animal/UPDATE_ANIMAL',
  DELETE_ANIMAL: 'animal/DELETE_ANIMAL',
  RESET: 'animal/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAnimal>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AnimalState = Readonly<typeof initialState>;

// Reducer

export default (state: AnimalState = initialState, action): AnimalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ANIMALS):
    case REQUEST(ACTION_TYPES.FETCH_ANIMAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ANIMAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ANIMAL):
    case REQUEST(ACTION_TYPES.UPDATE_ANIMAL):
    case REQUEST(ACTION_TYPES.DELETE_ANIMAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ANIMALS):
    case FAILURE(ACTION_TYPES.FETCH_ANIMAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ANIMAL):
    case FAILURE(ACTION_TYPES.CREATE_ANIMAL):
    case FAILURE(ACTION_TYPES.UPDATE_ANIMAL):
    case FAILURE(ACTION_TYPES.DELETE_ANIMAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ANIMALS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANIMAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANIMAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ANIMAL):
    case SUCCESS(ACTION_TYPES.UPDATE_ANIMAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ANIMAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/animals';
const apiSearchUrl = 'api/_search/animals';

// Actions

export const getSearchEntities: ICrudSearchAction<IAnimal> = query => ({
  type: ACTION_TYPES.SEARCH_ANIMALS,
  payload: axios.get<IAnimal>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IAnimal> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ANIMAL_LIST,
  payload: axios.get<IAnimal>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAnimal> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ANIMAL,
    payload: axios.get<IAnimal>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAnimal> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ANIMAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAnimal> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ANIMAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAnimal> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ANIMAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
