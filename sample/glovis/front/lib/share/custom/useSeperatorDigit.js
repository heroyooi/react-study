import { useState, useEffect } from 'react';

const useSeperatorDigit = (value='', newSeperators=[]) =>{
    const [seperators, setSeperators] = useState(newSeperators)

    const seperate = (value) => {
        return seperators.reduce((val, item, i)=>{
            if(i == 0){
                const digit = value.toString().substring(0, item)
                if(digit) {
                    val.push(digit)
                }
            } else {
                const digit = value.toString().substring(seperators[i-1], seperators[i])
                if(digit){
                    val.push(digit)
                }
            }
            return val
        }, [])
    }

    const [text, setText] = useState(value)
    const [seperatedText, setSeperatedText] = useState(seperate(text))

    useEffect(()=>{
        setSeperatedText(seperate(text))
    },[ text, seperators ])

    return [seperatedText, setText, setSeperators, text]
}

export default useSeperatorDigit
