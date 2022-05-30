import { configureStore } from "@reduxjs/toolkit";
import leaguesSlice from "./leagues/leagues-slice";

const store = configureStore({
    reducer: {
        leagues: leaguesSlice.reducer
    }
})

export default store