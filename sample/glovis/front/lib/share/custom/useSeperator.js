import { useState, useEffect } from 'react';

const useSeperator = (value='', newSeperator='-') =>{
    const [seperator, setSeperator] = useState(newSeperator)
    const [text, setText] = useState(value)
    const seperate = () => text?.split(seperator) ?? ['','','']
    const [seperatedText, setSeperatedText] = useState(seperate)

    useEffect(()=>{
        setSeperatedText(seperate)
    },[ text, seperator ])

    return [seperatedText, setText, setSeperator, text]
}

export default useSeperator
