import logo from './logo.svg';
import './App.css';

import {
  useQuery,
  gql, useMutation
} from "@apollo/client";

const q = gql`
query q {
  getCount{
    id
    count
  }
}
`

const m = gql`
mutation m($c: Int!) {
  updateCount(count: $c) {
    id
    count
  }
}
`


function App() {
  const {data, loading} = useQuery(q);
  const [update] = useMutation(m);

  const onIncrement = () => {
    update({
      variables: {
        c: data.getCount.count + 1,
      },
      optimisticResponse: {
        updateCount: {
          __typename: "Count",
          count: data.getCount.count + 1,
          id: "COUNTER_123"
        }
      }
    })
  }

  const onDecrement = () => {
    update({
      variables: {
        c: data.getCount.count - 1,
      },
      optimisticResponse: {
        updateCount: {
          __typename: "Count",
          count: data.getCount.count - 1,
          id: "COUNTER_123"
        }
      }
    })
  }

  console.log(data)

  return (
    <div className="App">
      {!!data && (
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
            <button style={{marginRight: 10}} onClick={onDecrement} >decrement</button>
            <div>{data.getCount.count}</div>
            <button style={{marginLeft: 10}} onClick={onIncrement} >increment</button>
          </div>
      )}
    </div>
  );
}

export default App;
