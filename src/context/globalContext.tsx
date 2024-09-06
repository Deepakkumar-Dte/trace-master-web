import { Spinner } from "@/components/ui";
import { getLookupList } from "@/shared/api";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type ListType = { label: string; value: string }[] | [];

interface TInitValue {
  categoryList: ListType;
  unitList: ListType;
  setUnitList: Dispatch<SetStateAction<ListType>>;
  setCategoryList: Dispatch<SetStateAction<ListType>>;
}

const initValue: TInitValue = {
  categoryList: [],
  unitList: [],
  setUnitList: () => {},
  setCategoryList: () => {},
};
export const GlobalContext = createContext(initValue);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [categoryList, setCategoryList] = useState<ListType>([]);
  const [unitList, setUnitList] = useState<ListType>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    try {
      const [category, units] = await Promise.all([
        await getLookupList({ type: "category" }),
        getLookupList({ type: "unit", forLookupValue: true }),
      ]);
      const { data: CategoryList } = category;
      const { data: UnitsList } = units;
      setCategoryList(CategoryList);
      setUnitList(UnitsList);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ categoryList, unitList, setUnitList, setCategoryList }}
    >
      {isLoading ? (
        <div style={{ height: "100vh" }}>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </GlobalContext.Provider>
  );
};
