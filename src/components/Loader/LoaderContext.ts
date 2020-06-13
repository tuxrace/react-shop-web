import { createContext } from 'react'

type Value = {
    loading: boolean;
    setLoader: (loadingVal: boolean) => void;
}

const LoaderContext = createContext<Value>({
    loading: false,
    setLoader: () => {},
});

export default LoaderContext    