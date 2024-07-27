import { macrodmContext } from 'contexts/MacrodmContext';
import { useContext } from 'react';

const useMacrodm = () => useContext(macrodmContext);

export default useMacrodm;
