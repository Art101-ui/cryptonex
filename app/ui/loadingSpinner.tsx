import { RevolvingDot } from 'react-loader-spinner'
export default function DefaultSpinner() {
  return (
    <RevolvingDot
    visible={true}
    radius={25}
    color="#9D9DFA"
    ariaLabel="revolving-dot-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
  )

}
