const Loading = ({isLoading, type="type1", children}) =>{
  const Load = () =>{
    if (isLoading) {
      if(type === "type1"){
        return (
          <div className="loading type1">
            <div className="loading-dim"></div>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        );
      }
      else if(type === "type2"){
        return (
          <div className="loading type2">
            <div className="loading-dim"></div>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        );
      }
      else{}
    }
  }
  return (
    <>
      <Load />
      {children}
    </>
  )
}


export default Loading