import React from 'react';
import '../../App.css';

const Chat = ({ author, message, me }) => {
  return (
    <div className="flex flex-col">
      {me ? (
        <div className="rounded-tl-2xl rounded-b-2xl border border-gray-400 p-3 mt-4 ml-auto mr-4 shadow-lg">
          <div className="text-xs italic font-thin font-mono">~ {author}</div>
          <div className="max-w-5xl">{message}</div>
        </div>
      ) : (
        <div className="rounded-tr-2xl rounded-b-2xl border border-gray-400 p-3 mt-4 ml-4 mr-auto shadow-lg">
          <div className="text-xs italic font-thin font-mono">~ {author}</div>
          <div className="max-w-5xl">{message}</div>
        </div>
      )}
    </div>
  );
}

export default Chat;
