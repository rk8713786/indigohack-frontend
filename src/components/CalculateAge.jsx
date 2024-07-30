import React from 'react'

function CalculateAge(data) {

    var today = new Date();
    var birthDate = new Date(data);
    var age=today.getFullYear() - birthDate.getFullYear();
    var month=today.getMonth()-birthDate.getMonth();
    if(month<0 || (month===0 && today.getDate()<birthDate.getDate()))
    {
        age--;
    }
    console.log(age)
    return (
       age
    )
}

export default CalculateAge
