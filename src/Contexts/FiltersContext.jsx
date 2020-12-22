import React, { useContext, useReducer } from 'react';
import { act } from 'react-dom/test-utils';

const FiltersContext = React.createContext();

const initialFiltersState = {
  filters: {
    name: '',
    cost: undefined,
    date: undefined,
    priority: undefined,
    state: undefined,
    creationTime: undefined
  }
}


const filtersReducer = (state, action = initialFiltersState) => {
  if (action.filters) {
    const filters = { ...state.filters, ...action.filters }

    const data = { filters: filters };

    // console.log(data);
    return data;
  }

  return state;
}


const FiltersContextProvider = props => {
  const { reducer, initState, children } = props;
  const [filtersState, filtersDispatch] = useReducer(reducer, initState);
  return <FiltersContext.Provider value={{ filtersState, filtersDispatch }}>{children}</FiltersContext.Provider>;
}
const useFiltersContext = () => useContext(FiltersContext);

function filtredNotes(toFilter, filters) {
  // console.log(toFilter, filters);
  const filtredByName = toFilter.filter(e => e.name.includes(filters.name));
  const filtredByCost = filters.cost && filters.cost >= 0 ? filtredByName.filter(
    e => +e.cost <= +filters.cost
  ) : filtredByName;
  const filtredByDate = filters.date ? filtredByCost.filter(
    e => {
      return (e.date?.getMonth() <= filters.date?.getMonth() &&
        e.date?.getDate() <= filters.date?.getDate() &&
        e.date?.getFullYear() <= filters.date.getFullYear());
    }
  ) : filtredByCost;
  const filtredByPriority = filters.priority ? filtredByDate.filter(
    e => e.priority === filters.priority
  ) : filtredByDate;
  const filtredByState = filters.state ? filtredByPriority.filter(
    e => e.state === filters.state
  ) : filtredByPriority;
  const filtredByCreationTime = filters.creationTime ? filtredByState.filter(e => {
    return (e.creationTime.getFullYear() === filters.creationTime.getFullYear() &&
      e.creationTime.getMonth() === filters.creationTime.getMonth() &&
      e.creationTime.getDate() === filters.creationTime.getDate());
  }) : filtredByState;

  // console.log(filtredByState);

  return filtredByCreationTime;
}

export { FiltersContext, FiltersContextProvider, initialFiltersState, filtersReducer, filtredNotes }
export default useFiltersContext;

