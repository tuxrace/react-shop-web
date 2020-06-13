import React, { useContext, useState } from "react";
import { CircularProgress } from '@material-ui/core'
import LoaderContext from "./LoaderContext";
import "./Loader.scss";

type Value = {
    loading: boolean;
    setLoader: (loadingVal: boolean) => void;
}

const LoaderProvider: React.FC = (props) => {
  const { children } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const setLoader = (loadingVal: boolean) => {
    setLoading(loadingVal);
  }

  return (
    <LoaderContext.Provider value={{ loading, setLoader }}>
        {loading && <div className="Loader"> <CircularProgress size={80} /> </div>}
        {React.Children.only(children)}
    </LoaderContext.Provider>
  );
};

const useLoader = () => {
    const { loading, setLoader } = useContext<Value>(LoaderContext);
    return {
        loading, 
        setLoader
    }
}

export { LoaderProvider };
export { useLoader };
export { default } from "./LoaderContext";
