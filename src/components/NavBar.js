import React from 'react'
import styled from "styled-components";
 import {problems} from '../store/dtb'
 
function NavBar() {
    const list = problems.map(problem => <li key={problem}><a href='#'>{problem}</a></li>)
  return (
    <Container>
        <LeftNavBar>
            <img src='https://cssbattle.dev/images/logo.svg'></img>
            <h2 className='level'>
                <a href="#">Battle #19</a>
            </h2>
            <details className='problem-dropbox'>
                <summary>{problems[0]}</summary>
                <ul className='other-problems'>
                    {list}
                </ul>
            </details>
        </LeftNavBar>
        <RightNavBar></RightNavBar>
    </Container>
  )
}
 
export default NavBar
 
const Container=styled.div`
min-width:1280px;
background:#0f1117;
display:flex;
align-items:center;`
 
const LeftNavBar=styled.div`
display:flex;
align-items:center;`
 
const RightNavBar=styled.div``


function multiply(a,b){
    let res=a*b;
    console.log(res);
    return res;
}

multiply(2,4);