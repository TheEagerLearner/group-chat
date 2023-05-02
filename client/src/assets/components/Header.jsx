const Header = ({room,clientid})=>{

    return(
        <div className="absolute flex justify-center items-center w-full p-4 shadow-lg bg-lime-600">
            <div className="font-mono text-xl">{clientid} ~ {room}</div>
        </div>
    );
}

export default Header;