import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../Context/AppContext';
import axios from 'axios';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(appContext);
  const { questions, loading, currentQues, correctAns } = state;

  const [currentAnser, setCurrentAnser] = useState('');

  // useEffect(() => {
  //   if (!JSON.parse(localStorage.getItem('questions'))) {
  //      const getAllQuestions = async () => {
  //        dispatch({ type: 'getQuestionsRequest' });
  //        const { data } = await axios.get(`/api/questions`);
  //        if (data.success) {
  //          //console.log(data.sendQues);
  //          localStorage.setItem('questions', JSON.stringify(data.sendQues));
  //          dispatch({ type: 'getQuestionsSuccess', payload: data.sendQues });
  //        }
  //      };
  //     getAllQuestions();
  //   }
  // }, []);

  useEffect(() => {
    let btns = document.querySelectorAll('.btns button');
    btns.forEach(
      (el) =>
        (el.classList = 'block font-bold bg-cyan-500 text-xl rounded-xl py-2')
    );
    btns.forEach((el) => (el.disabled = false));
    setCurrentAnser('');
  }, [currentQues]);

  function answer(e) {
    let btns = document.querySelectorAll('.btns button');
    btns.forEach(
      (el) =>
        (el.classList = 'block font-bold bg-cyan-500 text-xl rounded-xl py-2')
    );
    e.classList = 'block font-bold bg-cyan-800 text-xl rounded-xl py-2';
    setCurrentAnser(e.innerText);
    //console.log(e.innerText === questions[0].pos);
  }

  function next(e) {
    if (currentAnser !== '') {
      let btns = document.querySelectorAll('.btns button');

      btns.forEach((el) => {
        if (el.textContent === currentAnser) {
          if (el.textContent === questions[currentQues].pos) {
            el.classList =
              'block font-bold bg-green-500 text-xl rounded-xl py-2';
            let newCorrectAns = correctAns;
            newCorrectAns++;
            localStorage.setItem(
              'newCorrectAns',
              JSON.stringify(newCorrectAns)
            );
          } else {
            el.classList = 'block font-bold bg-red-500 text-xl rounded-xl py-2';
          }
        }
      });

      btns.forEach((el) => (el.disabled = true));

      if (currentQues <= 9) {
        setTimeout(() => {
          let newBtn = currentQues;
          newBtn++;
          localStorage.setItem('currentQues', JSON.stringify(newBtn));
          dispatch({ type: 'increase', payload: newBtn });
          if (currentQues === 9) {
            navigate('/end');
          }
        }, 1500);
      }
    }
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 min-h-screen flex justify-center items-center">
          <div
            className="w-11/12 mx-auto bg-gray-500 text-white shadow-xl border rounded-xl 
          absolute py-6"
          >
            <h2 className="text-2xl text-center">
              What's the Type OF{' '}
              <span className="text-yellow-500 font-bold">
                {questions && questions[currentQues]?.word}
              </span>
            </h2>
            <div className="grid grid-rows-1 border w-11/12 mx-auto mt-6 p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 btns">
                <button
                  className="block font-bold bg-cyan-500 text-xl rounded-xl py-2"
                  onClick={(e) => answer(e.target)}
                >
                  noun
                </button>
                <button
                  className="block font-bold bg-cyan-500 text-xl rounded-xl py-2"
                  onClick={(e) => answer(e.target)}
                >
                  verb
                </button>
                <button
                  className="block font-bold bg-cyan-500 text-xl rounded-xl py-2"
                  onClick={(e) => answer(e.target)}
                >
                  adverb
                </button>
                <button
                  className="block font-bold bg-cyan-500 text-xl rounded-xl py-2"
                  onClick={(e) => answer(e.target)}
                >
                  adjective
                </button>
              </div>
            </div>
            <div className="arrow w-1/2 mx-auto mt-4 flex justify-evenly items-center">
              <h2 className="text-2xl font-bold">{currentQues * 10}%</h2>
              <button
                className="bg-yellow-500 text-white font-bold text-xl p-2 rounded-xl"
                onClick={() => next()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
