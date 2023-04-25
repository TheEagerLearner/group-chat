import '../../App.css';
import '@fortawesome/fontawesome-free/css/all.css';


const BtmTextField = ({onChange,value,onSubmit})=>{

    return(
    <div className="absolute bottom-4 w-screen">
        <div className="flex items-center border border-gray-200 rounded-100 p-3 mx-10 shadow-lg">
            <input
                className="border-none w-full px-3 py-1 ml-4 text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Type a message"
                onChange={onChange}
                value={value}
            />
            <div className="ml-4">
            <button 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 hover:bg-green-400 focus:outline-none"
                onClick={onSubmit}
            >
                <i className="far fa-paper-plane text-white"></i>
            </button>
            </div>
        </div>
    </div>
    );
}

export default BtmTextField;