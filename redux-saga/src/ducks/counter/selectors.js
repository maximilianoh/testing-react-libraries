const getCount = (state) => state.counterGroup.count;
const getHistory = (state) => state.counterGroup.history;
const selectors = {
    getCount,
    getHistory
};
export default selectors;