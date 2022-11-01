import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../Context/AppContext';
import Loading from './Loading';

export default function End() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(appContext);
  const { correctAns, rank, loading } = state;
  //console.log(rank);

  useEffect(() => {
    const getScore = async () => {
      if (correctAns) {
        dispatch({ type: 'getRankRequest' });
        const { data } = await axios.get(`/api/score?score=${correctAns}`);
        dispatch({ type: 'getRankSuccess', payload: data.rank });
        //console.log(data);
      }
    };
    getScore();
  }, [correctAns, dispatch]);

  async function newStart() {
    localStorage.removeItem('questions');
    localStorage.removeItem('currentQues');
    localStorage.removeItem('newCorrectAns');
    navigate('/');
  }

  return (
    <div className="container mx-auto px-4 min-h-screen flex justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div
          className="w-11/12 mx-auto bg-gray-500 text-white shadow-xl border rounded-xl 
          absolute py-6"
        >
          <div className="heading">
            <p className="font-bold text-center text-2xl">
              Success Your RANK is{' '}
              <span className="">{rank && Number(rank)}</span>
            </p>
          </div>
          <button
            className="bg-yellow-400 text-white block mx-auto mt-6 py-2 px-3 rounded-xl font-bold"
            onClick={newStart}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
