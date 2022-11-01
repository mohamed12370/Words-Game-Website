import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../Context/AppContext';
import axios from 'axios';

export default function Start() {
  const navigate = useNavigate();
  const { dispatch } = useContext(appContext);

  async function getQuestion() {
    dispatch({ type: 'getQuestionsRequest' });
    const { data } = await axios.get(`/api/questions`);
    if (data.success) {
      //console.log(data.sendQues);
      localStorage.setItem('questions', JSON.stringify(data.sendQues));
      dispatch({ type: 'getQuestionsSuccess', payload: data.sendQues });
      navigate('/home');
    }
  }

  return (
    <div className="container mx-auto px-4 min-h-screen flex justify-center items-center">
      <div className="container mx-autow-11/12 mx-auto bg-gray-500 text-white shadow-xl border rounded-xl px-6">
        <button
          className="bg-yellow-500 font-bold text-2xl w-1/2 py-2 rounded-xl my-6 mx-auto block"
          onClick={getQuestion}
        >
          Start
        </button>
      </div>
    </div>
  );
}
