import {
  useEffect,
  useState
} from 'preact/hooks';

import usePrevious from './usePrevious';

/**
 * A custom hook to manage state changes with deep comparison.
 *
 * @param {any} value - The current value to manage.
 * @param {any} defaultValue - The initial default value for the state.
 * @returns {any} - Returns the current state.
 */
export default function useDeepCompareState(value, defaultValue) {

  const [ state, setState ] = useState(defaultValue);

  const previous = usePrevious(value, defaultValue, [ value ]);

  const changed = !compare(previous, value);

  useEffect(() => {
    if (changed) {
      setState(value);
    }
  }, [ changed, value ]);

  return state;

}

// helpers //////////////////////////

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
