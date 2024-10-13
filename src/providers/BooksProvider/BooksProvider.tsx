import { createContext, useReducer, PropsWithChildren } from 'react';

export type State = {
  activeBookId: number;
  activeChapterId: number;
  activePageIdx: number;
};

type Action = { payload: Partial<State> };

type Dispatch = (action: Action) => void;

const reducer = (state: State, action: Action) => {
  return { ...state, ...action.payload };
};

export const BooksContextData = createContext<State | undefined>(undefined);

export const BooksContextApi = createContext<Dispatch | undefined>(undefined);

const initialState = {
  activeBookId: 0,
  activeChapterId: 0,
  activePageIdx: 0,
} satisfies State;

export const BooksProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BooksContextData.Provider value={state}>
      <BooksContextApi.Provider value={dispatch}>
        {children}
      </BooksContextApi.Provider>
    </BooksContextData.Provider>
  );
};
