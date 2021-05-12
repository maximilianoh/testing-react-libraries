const getCount = (state) => state.counterGroup.count;
const getHistory = (state) => state.counterGroup.history;
const getSize = (state) => state.counterGroup.data.length;
const selectors = {
    getCount,
    getHistory,
    getSize
};
export default selectors;