import React,{useRef,useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { htmlLanguage} from '@codemirror/lang-html';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useState } from 'react';
 import styled from "styled-components";


import EditorHeader from './EditorHeader';
import {DEFAULT_CODE} from '../store/CodeMaterial'
import OutPutHeader from './OutPutHeader';
import TargetHeader from './TargetHeader';

 



function Arena() {
    const [code,setCode]=useState(DEFAULT_CODE);
    const [count,setCount]=useState(0);
    const [isChecked, setIsChecked] = useState( false );

    const changeCheckBoxValue = () => {
        setIsChecked(state => !state);
    }


  //ref
  const userOutPutRef = useRef();
  const imgRef = useRef();
  const outputContainerRef=useRef();
  const iframeRef=useRef();

//render everytime the codechange
    useEffect(()=>{
    
    },[code])
      


//compare output to img 
    function imageCompareSlider(e) {
      if (isChecked) {
        userOutPutRef.current.style.cursor = "col-resize";
        iframeRef.current.style["z-index"] = "16";
        iframeRef.current.style["border-right"] = "2px solid red";
        iframeRef.current.style["border-left"] = "none";
        iframeRef.current.style.width =
          e.clientX - outputContainerRef.current.offsetLeft + "px";

      }
    }
  
    function resetWidth() {
      if (isChecked) {
        userOutPutRef.current.style.cursor = "unset";
        iframeRef.current.style["border-right"] = "none";
        iframeRef.current.style["z-index"] = "10";
        imgRef.current.style["z-index"] = "9";
        iframeRef.current.style.width = "400px";
      }
    }
  return (
    <Container>
      <Editor>
        <EditorHeader count={count}/>
        <CodeMirror
          className='editor'
          value={code}
          height="650px"
          width="650px"
          theme={dracula}
          extensions={[htmlLanguage]}
          onChange={(e) => {
            setCode(e);
            setCount(e.length);
          }}
        

        />
      </Editor>
      <OutPut>
            <OutPutHeader isChecked={isChecked} changeCheckBoxValue={changeCheckBoxValue}></OutPutHeader>
            <div
          id="output-container"
          className="output-container"
          ref={outputContainerRef}
        >
          <iframe
            id="source"
            className="iframe-output"
            width="400px"
            height="300px"
            title="output"
            scrolling='no'
            ref={iframeRef}
            srcDoc={code}
          ></iframe>
          <div
            ref={userOutPutRef}
            className="output-layer"
            onMouseMove={imageCompareSlider}
            onMouseLeave={resetWidth}
          ></div>
          <div id="img-layer" className="img-layer" ref={imgRef}>
            <img
              src='https://cssbattle.dev/targets/1.png'
              width="400px"
              height="300px"
              alt="level1"
            />
          </div>
        </div>

        </OutPut>
      <Target>
        <TargetHeader></TargetHeader>
      <img src='https://cssbattle.dev/targets/1.png' className='target_img'/>
      </Target>
    </Container>
  )
}

export default Arena
const Container =styled.div`
display:flex`
const Editor=styled.div`
min-width:27.5rem;
max-width:100%;
min-height: calc(100vh - 8rem);
`
const Target=styled.div`
min-width:27.5rem;
max-width:100%;
min-height: calc(100vh - 8rem);
 img{
  width:400px;
  height:300px;
 }`
 const OutPut=styled.div``;