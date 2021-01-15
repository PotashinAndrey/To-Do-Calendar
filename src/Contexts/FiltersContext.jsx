import { Result } from 'antd';
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
  },
  purchases: {
    name: '',
    cost: [null, null],
    deadline: true,
    range: [null, null],
    priority: ["high", "medium", "low", 'none'],
    state: ['todo']
  }
}


const filtersReducer = (state, action = initialFiltersState) => {
  if (action) {
    const data = { ...state, ...action };

    console.log(data);
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
  const filtredByName = toFilter.filter(e => e.name.toLowerCase().trim().includes(filters.name));
  const filtredByCost = filters.cost && filters.cost >= 0 ? filtredByName.filter(
    e => +e.cost <= +filters.cost
  ) : filtredByName;
  const filtredByDate = filters.deadline ? filtredByCost.filter(
    e => {
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

  return filtredByCreationTime;
}

function filterPurchases(toFilter, filters) {
  const filtredByName = toFilter.filter(e => e.name.toLowerCase().trim().includes(filters.name.trim().toLowerCase()));

  const filtredByCost = filtredByName.filter(e => {
    const result1 = filters.cost[0] ? e.cost >= filters.cost[0] : true;
    const result2 = filters.cost[1] ? e.cost <= filters.cost[1] : true;
    return result1 && result2;
  });

  const filtredByDeadline = filtredByCost.filter(e => filters.deadline || e.deadline);

  const filtredByPriority = filtredByDeadline.filter(e => filters.priority.includes(e.priority === undefined ? 'none' : e.priority));

  const filtredByRange = filtredByPriority.filter(e => {
    const result1 = filters.range[0] ? (e.deadline ? new Date(e.deadline).getTime() >= filters.range[0].getTime() : true) : true;
    const result2 = filters.range[1] ? (e.deadline ? new Date(e.deadline).getTime() <= filters.range[1].getTime() : true) : true;
    return result1 && result2;
  });

  const filtredByState = filtredByRange.filter(e => filters.state.includes(e.state));

  return filtredByState;
}

export { FiltersContext, FiltersContextProvider, initialFiltersState, filtersReducer, filtredNotes, filterPurchases }
export default useFiltersContext;

