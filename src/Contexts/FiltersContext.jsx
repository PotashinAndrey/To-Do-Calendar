import React, { useContext, useReducer } from 'react';
import { act } from 'react-dom/test-utils';

const FiltersContext = React.createContext();

const initialFiltersState = {
  filters: {
    name: '',
    cost: undefined,
    deadline: undefined,
    priority: undefined,
    state: undefined,
    created: undefined
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
  const filtredByName = toFilter.filter(e => e.name.toLowerCase().trim().includes(filters.name));
  const filtredByCost = filters.cost && filters.cost >= 0 ? filtredByName.filter(
    e => +e.cost <= +filters.cost
  ) : filtredByName;
  const filtredByDate = filters.deadline ? filtredByCost.filter(
    e => {
      // console.log(e, filters, e.deadline?.split('T')[0].split('-').sort((a, b) => b - a).join() === filters.deadline?.toLocaleDateString().split('.').sort((a, b) => b -a).join())
      return (e.deadline?.split('T')[0].split('-').sort((a, b) => b - a).join() === filters.deadline?.toLocaleDateString().split('.').sort((a, b) => b -a).join());
    }
  ) : filtredByCost;
  const filtredByPriority = filters.priority ? filtredByDate.filter(
    e => e.priority === filters.priority
  ) : filtredByDate;
  const filtredByState = filters.state ? filtredByPriority.filter(
    e => e.state === filters.state
  ) : filtredByPriority;
  const filtredByCreationTime = filters.created ? filtredByState.filter(e => {
    return (e.created.getFullYear() === filters.created.getFullYear() &&
      e.created.getMonth() === filters.created.getMonth() &&
      e.created.getDate() === filters.created.getDate());
  }) : filtredByState;

  // console.log(filtredByName);

  return filtredByCreationTime;
}

export { FiltersContext, FiltersContextProvider, initialFiltersState, filtersReducer, filtredNotes }
export default useFiltersContext;

