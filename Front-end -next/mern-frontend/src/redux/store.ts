import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loggerMiddleware from "redux-logger";
import { createInjectorsEnhancer } from "redux-injectors";
import { createRootReducer } from "./reducer";
import { rootSaga } from "./saga";



function configureAppStore(initialState: any) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const runSaga = sagaMiddleware.run;
  // sagaMiddleware: Makes redux saga works

  let middlewares = [sagaMiddleware]; //loggerMiddleware

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: createRootReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(...middlewares),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== "production",
    // enhancers,
  });

  sagaMiddleware.run(rootSaga);
  return store;
}

export { configureAppStore };

const store = configureAppStore({});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
